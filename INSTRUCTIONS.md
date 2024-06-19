## Installation

```bash
npm ci
```

## Start

```bash
npm run dev
```

## Architecture

src/ui -- this folder contains reusable React UI elements -- these should normally go into a design system and a separate repo, where we maintain build and publish elements as individual npm packages ready to be consumed throughout projects across an org. I kept it simple for the sake of the assignment

src/app the entry point of the consumer app, where we implement a table and consume some other UI elements from the above said 'design system'

in a work environment, I keep things separated such as:
src/pages -- unique components for pages/routes
src/components -- reusable components (!NOT UI elements) such as sections/layout blocks -- these use the composition pattern which involves using one or more UI elements
and finally, UI elements coming from a standalone project/repo/design system

UIelement(s) -> within components -> within pages

## Layers

when a user interracts with a page(route) via its components and UI elements, it interracts with logic/functions within the /utils folder, a middlelayer folder containing /HoCs and /hooks
these hocs and hooks interract with services, which in turn, interract with a backend

a user never interracts with a backend directly (obviously) nor does it interract with the service layer
it only interracts with UI elements that call hooks or hocs, that tap into services and then into backend
I implemented some simple helper/service alongside their respective hooks just to prove the way I structure an app (typically)

just some thoughts on how I structure/use/think things through, thanks!
