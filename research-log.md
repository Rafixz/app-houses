# Research Log — House Scores

Log de pesquisas, fontes e conclusões usadas para preencher os scores das casas.
Última atualização: 2026-06-29.

## Metodologia

- **3 pilares:** Vizinhança, Estrutura, Preço.
- **Soma simples** dentro de cada categoria. Score geral = soma das categorias.
- **Incerteza → N/A:** quesitos que os listings não confirmam ficam sem pontuação e marcados como "dados insuficientes" (não chuto valores).
- **Perfil cultural** é informativo (0 pontos), conforme pedido.
- Escala de pontos por quesito definida por mim (logic dada pelo usuário, valores máximos não), documentada em `scores.js`.

---

## Base de custo de gardening (Seattle)

- Fontes: Homeyou, HomeGuide, Homewyse, Classic Landscaping, LawnStarter (2026).
- Faixa: **$0,15–$0,56 / sqft / ano**. Mensal residencial típico $100–$300+; anual $900–$4.000 p/ ¼ acre.
- **Valor adotado:** ~**$0,35 / sqft de jardim / ano** (midpoint).
- **Área de jardim** = lote − pegada estimada do imóvel (footprint ≈ área construída do térreo; aproximação).

| Casa | Lote (sqft) | Pegada estim. (sqft) | Jardim (sqft) | Custo/ano (~$0,35) |
|---|---|---|---|---|
| Maple Leaf | 5.109 | ~2.980 | ~2.129 | ~$745 |
| Pinehurst | 7.214 | ~1.930 | ~5.284 | ~$1.849 |

→ Pinehurst tem jardim ~2,5x maior ⇒ gardening mais caro ⇒ score menor nesse quesito.

---

## Casa 1 — Maple Leaf (1528 NE 97th St, 98115)

### Vizinhança
- **Segurança:** Grade B+; mais segura que 41% de Seattle; crime ~21% acima da média nacional; furto é o ponto fraco (index 131). → **0,5/1**.
  - Fontes: Niche, CrimeGrade, DoorProfit, AreaVibes.
- **Comute p/ 350 Westlake Ave N:** ~20 min off-peak via I-5; 35–50 min no pico; Link via Roosevelt ~13–15 min / Northgate ~16–18 min. Acesso direto à I-5. → **1,5/2**.
  - Fontes: Sound Team Realty, SeattleHome.com, Moovit.
- **Distância da Aurora Ave:** 97th St (leste) separada da Aurora Ave N (oeste) pela I-5, >1 milha. Muito acima do mínimo de 4 quarteirões. → **1/1**.
- **Mercados ≤2mi:** Safeway 12318 15th Ave NE e 7300 Roosevelt Way NE. → **1/1**. (Fonte: Safeway local.)
- **Academias ≤15min:** Northgate cluster (24h Fitness, Seattle Athletic Club, Anytime). → **1/1**. (Fonte: Yelp/Wellhub/24hr.)
- **Longe de ruas movimentadas:** rua residencial calma, grid arborizado, buffer da I-5. → **1/1**. (Fonte: Portico, guias.)
- **Parques ≤4mi:** Maple Leaf Reservoir Park (16 acres) a poucos quarteirões + Thornton Creek. → **1/1**.
- **Perfil cultural (informativo):** ~7.600 hab, idade mediana ~37, 40%+ lares com crianças; familiar, diverso, "urban sophisticates"; maior grupo asiático 17,5%; inglês 79,8%.
  - Fontes: NeighborhoodScout, Niche, Movoto, Wikipedia.

### Estrutura
- 4 banheiros (2 full/1 ¾/1 half) → cheio. 4 quartos → cheio.
- Sem garagem (listing "No"). Driveway sim (2 uncovered).
- Open plan no principal (Great Room/Family Room/kitchen eating). 2 andares + porão.
- Lava/seca: utility no porão, master no 2º andar → não no mesmo andar (0).
- 1927, renovada aos studs em 2004 → idade parcial.
- Vaulted primary suite c/ deck e walk-in → king provável (sim), walk-in (sim), salas amplas (sim).
- **N/A:** backyard, ilha, appliances novos/stainless, fogão a gás, coifa, total de closets (não confirmados no listing).

### Preço
- Gardening ~$745/ano (jardim ~2.129 sqft) → barato → **1,5/2**.
- HOA $0 → **1/1**. Move-in ready (reno 2004) → **1/1**.

---

## Casa 2 — Pinehurst / Victory Heights (1905 NE 125th St, 98125)

### Vizinhança
- **Segurança:** Victory Heights mais seguro que 57% de Seattle, crime ~na média nacional; Pinehurst entre os mais seguros do norte. → **0,5/1**.
  - Fontes: Niche, DoorProfit, CrimeGrade, AreaVibes.
- **Comute p/ 350 Westlake:** mais ao norte; ~25–30 min carro, pico pode passar de 30 min; Pinehurst Link Station abre 2026. → **1/2**.
  - Fontes: Seattle Transit Blog, Sound Transit, WSDOT.
- **Distância da Aurora Ave:** 1905 fica na NE 125th, MESMA arterial que cruza a Aurora Ave N (a oeste). Mais perto do corredor que Maple Leaf. → **0,5/1**.
  - Fontes: Waze, SDOT (projeto 125th).
- **Mercados ≤2mi:** Safeway 15th Ave NE + Northgate. → **1/1**.
- **Academias ≤15min:** Northgate cluster. → **1/1**.
- **Longe de ruas movimentadas:** a casa fica SOBRE a NE 125th — arterial menor com bus stops, semáforos, 30mph, histórico de colisões (SDOT). Não está a ≥1 quarteirão. → **0/1**.
  - Fontes: SDOT (NE 130th/125th Mobility & Safety; Pedestrian Safety Enhancements; SDOT Blog 2010).
- **Parques ≤4mi:** Pinehurst tem muitos parques. → **1/1**. (Niche.)
- **Perfil cultural (informativo):** ~9.984 hab; urbano com pegada suburbana; jovens profissionais, muitos renters, perfil liberal; escolas bem avaliadas.
  - Fontes: Niche, City-Data, Homes.com.

### Estrutura
- 3 banheiros (2 full/1 half) → alto. 3 quartos → alto (mínimo do "cheio" pela lógica).
- Garagem destacada (2 covered) sim. Driveway/pavimento sim.
- Open floor plan explícito. Backyard grande, cercado, flagstone patio → ótimo p/ churrasco. 2 andares.
- Laundry no mesmo andar dos quartos (inclui master) → sim.
- Stainless steel confirmado; updates recentes + pré-inspeção → appliances novos sim.
- 2005 → idade cheia (mais nova). Walk-in no master sim. Salas amplas sim.
- **N/A:** ilha, fogão a gás (tem gas fireplace, mas fogão não confirmado), coifa, king fit, total de closets.

### Preço
- Gardening ~$1.849/ano (jardim ~5.284 sqft) → mais caro → **1/2**.
- HOA $0 → **1/1**. Move-in ready (telhado/pintura/pisos novos, pré-inspeção) → **1/1**.

---

## Pendências / a refinar
- Confirmar com plantas (floor plans) os itens N/A: ilha, coifa, fogão a gás, dimensão do master (king), contagem de closets, backyard da Maple Leaf.
- Police reports exatos por bloco para afinar o score de segurança (0/0,5/1).
- Tempos de comute door-to-door medidos no horário real desejado.
