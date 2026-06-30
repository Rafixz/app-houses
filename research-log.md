# Research Log — House Scores

Log de pesquisas, fontes e conclusões usadas para preencher os scores das casas.
Última atualização: 2026-06-29.

## Casas atuais
1. **Pinehurst** — 1905 NE 125th St, 98125
2. **Olympic Hills** — 2007 NE 137th St, 98125
3. **Haller Lake** — 13721 Meridian Ave N, 98133

*(Maple Leaf / 1528 NE 97th St foi removida a pedido.)*

## Metodologia

- **3 pilares:** Vizinhança, Estrutura, Preço.
- **Soma simples** dentro de cada categoria. Score geral = soma das categorias.
- **Incerteza → N/A:** quesitos que os listings não confirmam ficam sem pontuação e marcados como "dados insuficientes" (não chuto valores).
- **Perfil cultural** é informativo (0 pontos), conforme pedido.
- Escala de pontos por quesito definida por mim (lógica dada pelo usuário, valores máximos não), documentada em `scores.js`.

---

## Base de custo de gardening (Seattle)

- Fontes: Homeyou, HomeGuide, Homewyse, Classic Landscaping, LawnStarter (2026).
- Faixa: **$0,15–$0,56 / sqft / ano**. Valor adotado: ~**$0,35 / sqft de jardim / ano**.
- **Área de jardim** = lote − pegada estimada (footprint ≈ área construída do térreo; aproximação).

| Casa | Lote (sqft) | Pegada estim. | Jardim (sqft) | Custo/ano (~$0,35) | Obs |
|---|---|---|---|---|---|
| Pinehurst | 7.214 | ~1.930 | ~5.284 | ~$1.849 | jardim grande |
| Olympic Hills | 5.000 | ~1.760 | ~3.240 | ~$1.134 | landscaping maduro |
| Haller Lake | 3.995 | ~2.167 | ~1.828 | <~$640 | **gramado artificial** (mín. manutenção) |

---

## Casa 1 — Pinehurst (1905 NE 125th St, 98125)

### Vizinhança (resumo)
- **Segurança:** Victory Heights mais seguro que 57% de Seattle, ~na média nacional → **0,5/1**. (Niche, DoorProfit, CrimeGrade.)
- **Comute 350 Westlake:** norte, ~25-30 min; Link Pinehurst 2026 → **1/2**. (Seattle Transit Blog, Sound Transit.)
- **Aurora Ave:** na NE 125th, mesma arterial que cruza a Aurora → **0,5/1**. (Waze, SDOT.)
- **Mercados ≤2mi:** Safeway 15th Ave NE, Northgate → **1/1**.
- **Academias:** Northgate cluster → **1/1**.
- **Ruas movimentadas:** fica SOBRE a NE 125th (arterial, bus stops, semáforos, colisões — SDOT) → **0/1**.
- **Parques ≤4mi:** muitos parques (Niche) → **1/1**.
- **Perfil (info):** ~9.984 hab, jovens profissionais, liberal, muitos renters.

### Estrutura
- 3 banheiros, 3 quartos, garagem destacada (2), driveway, open plan, backyard cercado + flagstone patio, 2 andares, laundry no andar dos quartos, stainless confirmado, 2005 (idade cheia), walk-in no master, salas amplas.
- **N/A:** ilha, fogão a gás (tem gas fireplace), coifa, king fit, total de closets.

### Preço
- Gardening ~$1.849/ano (jardim ~5.284 sqft) → **1/2**. HOA $0 → **1/1**. Move-in ready → **1/1**.

---

## Casa 2 — Olympic Hills (2007 NE 137th St, 98125)

### Vizinhança (resumo)
- **Segurança:** Pinehurst/Olympic Hills, moderado → **0,5/1**. (Niche.)
- **Comute 350 Westlake:** bem ao norte (~9mi), ~25-35 min, Link Northgate → **1/2**.
- **Aurora Ave:** lado leste, separada pela I-5, longe → **1/1**. (Olympic Hills wiki.)
- **Mercados ≤2mi:** Fred Meyer, Target, Grocery Outlet, Costco (Lake City Square) → **1/1**.
- **Academias:** Northgate/Lake City <15 min → **1/1**.
- **Ruas movimentadas:** 137th é rua residencial calma, sem business district interno → **1/1**.
- **Parques ≤4mi:** Jackson Park Golf, Albert Davis Park → **1/1**.
- **Perfil (info):** Olympic Hills/Lake City — residencial, casas dos anos 1900s, área diversa em valorização.

### Estrutura
- 2 banheiros (1 full/1 ¾ — mínimo), 3 quartos, garagem anexa (1) + driveway (6 vagas), rambler open plan, yard cercado + patio + swim spa, **1 andar**, laundry no walk-in do master (mesmo nível), LG Café premium (novos), fogão a GÁS 6-burner + double ovens confirmado, 1952 mas reforma completa 2024 (novo painel/sewer/PEX/janelas/siding → idade alta), walk-in, salas amplas.
- **N/A:** ilha, acabamento stainless dos LG Café, coifa, king fit, total de closets.

### Preço
- Gardening ~$1.134/ano (jardim ~3.240 sqft, landscaping maduro) → **1,5/2**. HOA $0 → **1/1**. Turnkey (reforma 2024) → **1/1**.

---

## Casa 3 — Haller Lake (13721 Meridian Ave N, 98133)

### Vizinhança (resumo)
- **Segurança:** Haller Lake no 21º percentil (menos seguro), violência 7,4/1.000; lado OESTE (onde fica Meridian, perto da Aurora) é o pior (1 em 70) → **0/1**. (NeighborhoodScout, CrimeGrade, AreaVibes.)
- **Comute 350 Westlake:** norte (~9mi), bus 345/346/75 + RapidRide E na Aurora, Link 130th 2026 → **1/2**. (Moovit, SDOT, Sound Transit.)
- **Aurora Ave:** ~1 quarteirão a leste da Aurora (137th & Aurora se cruzam) → **0/1**. (Yelp/endereços vizinhos, SDOT Aurora Project.)
- **Mercados ≤2mi:** corredor Aurora/Northgate → **1/1**.
- **Academias:** Northgate/Bitter Lake <15 min → **1/1**.
- **Ruas movimentadas:** ~1 quarteirão da Aurora (arterial principal, projeto de segurança SDOT) → **0/1**.
- **Parques ≤4mi:** parque adjacente da HOA, acesso ao Haller Lake, Madison Pool a pé → **1/1**.
- **Perfil (info):** ~8.302 hab, renda alta (top 22% EUA), 24,2% nascidos no exterior, diverso, liberal, maioria proprietária.

### Estrutura
- 3 banheiros, 3 quartos, garagem anexa (2) + driveway EV-ready, open plan/great room, yard cercado com patio (gramado artificial), 2 andares, utility no andar superior (com master), stainless energy-efficient (2014 Built Green), corner lot com recuo, **2014 (a mais nova → idade cheia)**, walk-in no master, great room + bonus room.
- **N/A:** ilha, fogão a gás (tem gas fireplace; stove tipo incerto), coifa, king fit, total de closets.

### Preço
- Gardening: jardim ~1.828 sqft + **gramado artificial** → custo mínimo → **2/2**. HOA **$85/mês → 0/1** (regra: ter HOA não pontua). Move-in ready (2014) → **1/1**.

---

## Pendências / a refinar
- Confirmar com plantas (floor plans) os N/A: ilha, coifa, tipo de fogão, dimensão do master (king), contagem de closets, acabamento dos appliances.
- Police reports exatos por bloco para afinar segurança (0/0,5/1).
- Tempos de comute door-to-door medidos no horário real desejado.
- Atenção: **Haller Lake** perde forte em vizinhança (segurança + colado na Aurora) mas é a mais nova e com gardening mais barato; **Olympic Hills** equilibra bem (vizinhança calma + reforma 2024 + cozinha a gás) com o menor preço.
