/**
 * airo-image-slots.js — Runtime resolver for image/video slot URLs on static hosts.
 *
 * In dev/preview, the Vite plugin (export-plugins/media-assets-plugin.ts) runs as
 * server middleware and 302-redirects /airo-assets/images/<slot> (and /videos/<slot>)
 * requests to the real CDN URL stored in airo-media.json. Static hosts (GitHub Pages,
 * etc.) have no server, so that middleware never runs and those requests 404.
 *
 * This script fetches /airo-media.json once and rewrites any element whose src/href
 * points at /airo-assets/images/ or /airo-assets/videos/ to the resolved absolute
 * URL, mirroring the server's resolveSlotTargetUrl logic (light/dark variant support).
 * A MutationObserver keeps re-resolving elements added after the initial pass (React
 * renders after this script runs, since it's loaded synchronously in <head>).
 *
 * Loaded synchronously in <head>, same pattern as airo-video-slots.js.
 */
;(function () {
    var IMAGE_PREFIX = '/airo-assets/images/'
    var VIDEO_PREFIX = '/airo-assets/videos/'
    var manifest = null
    var manifestPromise = fetch('/airo-media.json')
      .then(function (r) { return r.ok ? r.json() : {} })
      .catch(function () { return {} })
      .then(function (m) {
        manifest = m || {}
        resolveAll(document)
        return manifest
      })
  
    function parseSlotPath(url, prefix) {
      if (url.indexOf(prefix) !== 0) return null
      var rest = url.slice(prefix.length)
      var qIndex = rest.indexOf('?')
      var query = qIndex >= 0 ? rest.slice(qIndex) : ''
      var slotPath = qIndex >= 0 ? rest.slice(0, qIndex) : rest
      var surfaceVariant = null
      if (slotPath.slice(-6) === '/light') {
        surfaceVariant = 'light'
        slotPath = slotPath.slice(0, -6)
      } else if (slotPath.slice(-5) === '/dark') {
        surfaceVariant = 'dark'
        slotPath = slotPath.slice(0, -5)
      }
      return { slotPath: slotPath, surfaceVariant: surfaceVariant, query: query }
    }
  
    function resolveTargetUrl(slot, surfaceVariant) {
      if (!slot) return null
      var targetUrl = slot.currentUrl || ''
      if (surfaceVariant === 'light' && slot.lightSurfaceUrl) targetUrl = slot.lightSurfaceUrl
      else if (surfaceVariant === 'dark' && slot.darkSurfaceUrl) targetUrl = slot.darkSurfaceUrl
      return targetUrl || null
    }
  
    function resolveUrl(rawUrl) {
      if (!manifest || !rawUrl) return null
      var parsed = parseSlotPath(rawUrl, IMAGE_PREFIX) || parseSlotPath(rawUrl, VIDEO_PREFIX)
      if (!parsed) return null
      var slot = manifest[parsed.slotPath]
      if (!slot) return null
      return resolveTargetUrl(slot, parsed.surfaceVariant)
    }
  
    function resolveAttr(el, attr) {
      var current = el.getAttribute(attr)
      if (!current) return
      if (el.getAttribute('data-airo-slot-resolved') === current) return
      var resolved = resolveUrl(current)
      if (resolved && resolved !== current) {
        el.setAttribute(attr, resolved)
        el.setAttribute('data-airo-slot-resolved', resolved)
      }
    }
  
    function resolveElement(el) {
      if (!el || el.nodeType !== 1) return
      if (el.tagName === 'IMG' || el.tagName === 'SOURCE') resolveAttr(el, 'src')
      if (el.tagName === 'VIDEO') resolveAttr(el, 'src')
      if (el.tagName === 'IMG' && el.hasAttribute('srcset')) resolveAttr(el, 'srcset')
      var style = el.getAttribute && el.getAttribute('style')
      if (style && style.indexOf(IMAGE_PREFIX) !== -1) {
        var resolved = style.replace(/url\((['"]?)(\/airo-assets\/images\/[^'")]+)\1\)/g, function (m, q, url) {
          var r = resolveUrl(url)
          return r ? 'url(' + q + r + q + ')' : m
        })
        if (resolved !== style) el.setAttribute('style', resolved)
      }
    }
  
    function resolveAll(root) {
      if (!manifest) return
      resolveElement(root)
      var els = root.querySelectorAll
        ? root.querySelectorAll('img, video, source, [style*="airo-assets"]')
        : []
      for (var i = 0; i < els.length; i++) resolveElement(els[i])
    }
  
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i]
        for (var j = 0; j < m.addedNodes.length; j++) resolveAll(m.addedNodes[j])
        if (m.type === 'attributes' && m.target) resolveElement(m.target)
      }
    })
  
    function start() {
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'srcset', 'style'],
      })
      manifestPromise.then(function () { resolveAll(document) })
    }
  
    if (document.documentElement) start()
    else document.addEventListener('DOMContentLoaded', start)
  })()