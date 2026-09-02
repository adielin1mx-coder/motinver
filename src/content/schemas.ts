import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "titleLine2": z.string(),
        "subtitle": z.string(),
        "ctaPrimary": z.string(),
        "ctaSecondary": z.string()
      }),
      "metrics": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "suffix": z.string(),
        "label": z.string()
      })),
      "sectors": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "name": z.string()
        }))
      }),
      "portfolio": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "company": z.string(),
          "sector": z.string(),
          "stage": z.string(),
          "metric": z.string(),
          "description": z.string()
        })),
        "cta": z.string()
      }),
      "process": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string(),
        "steps": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "cta": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "button": z.string(),
        "note": z.string()
      })
    }),
    proceso: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "steps": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "title": z.string(),
        "duration": z.string(),
        "description": z.string(),
        "details": z.array(z.string())
      })),
      "criteria": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "tickets": z.object({
        "title": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "stage": z.string(),
          "range": z.string(),
          "equity": z.string(),
          "description": z.string()
        }))
      }),
      "showcase": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "quote": z.string(),
          "author": z.string(),
          "role": z.string(),
          "stage": z.string(),
          "result": z.string()
        }))
      }),
      "cta": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "button": z.string()
      })
    }),
    portfolio: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "filters": z.array(z.string()),
      "companies": z.array(z.object({
        "id": z.string(),
        "company": z.string(),
        "sector": z.string(),
        "stage": z.string(),
        "country": z.string(),
        "founded": z.string(),
        "metric": z.string(),
        "metricLabel": z.string(),
        "description": z.string(),
        "tags": z.array(z.string())
      })),
      "cta": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "button": z.string()
      })
    }),
    agendar: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "form": z.object({
        "title": z.string(),
        "fields": z.object({
          "name": z.string(),
          "email": z.string(),
          "company": z.string(),
          "website": z.string(),
          "stage": z.string(),
          "sector": z.string(),
          "raise": z.string(),
          "description": z.string(),
          "submit": z.string()
        }),
        "stageOptions": z.array(z.string()),
        "sectorOptions": z.array(z.string()),
        "raiseOptions": z.array(z.string())
      }),
      "sidebar": z.object({
        "title": z.string(),
        "steps": z.array(z.object({
          "step": z.string(),
          "title": z.string(),
          "description": z.string(),
          "id": z.string()
        })),
        "contact": z.object({
          "title": z.string(),
          "email": z.string(),
          "whatsapp": z.string(),
          "whatsappLabel": z.string(),
          "note": z.string()
        })
      })
    }),
    criterios: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "thesis": z.object({
        "title": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "focus": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string(),
        "sectors": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "description": z.string(),
          "examples": z.string(),
          "conviction": z.string()
        }))
      }),
      "criteria": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "weight": z.string(),
          "description": z.string(),
          "signals": z.array(z.string())
        }))
      }),
      "stages": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "stage": z.string(),
          "ticket": z.string(),
          "equity": z.string(),
          "milestone": z.string(),
          "description": z.string(),
          "ideal": z.boolean()
        }))
      }),
      "nonFocus": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "cta": z.object({
        "title": z.string(),
        "subtitle": z.string(),
        "button": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;