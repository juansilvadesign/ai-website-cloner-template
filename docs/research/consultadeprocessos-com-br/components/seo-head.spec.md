# SEOHead Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/SEOHead.astro`
- **Interaction model:** static metadata

## Required Metadata

- title: `Consulta de Processos por CPF/CNPJ | 2 Grátis no Cadastro`
- description: `Consulta de processos por CPF e CNPJ em todos os tribunais do Brasil. Análise jurídica e de risco em segundos. Cadastre-se grátis e teste agora.`
- canonical: `https://consultadeprocessos.com.br/`
- locale: `pt_BR`; type: `website`; site name: `Consulta de Processos`
- OG image: `https://consultadeprocessos.com.br/og-image.jpg`, 1200×630, alt `Consulta de Processos - Plataforma de acompanhamento processual`
- Twitter: `summary_large_image` and matching title/description/image
- favicon: `/clones/consultadeprocessos-com-br/seo/favicon.ico`

## Implementation Notes

- Resolve the canonical from the clone-local site configuration to the production origin, not localhost.
- Render exactly one metadata component via the clone `BaseLayout.astro`.
- This clone stays namespaced; do not modify the hub layout, root Astro config, sitemap, or shared `robots.txt`.
