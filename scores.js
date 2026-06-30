// ─────────────────────────────────────────────────────────────────────────────
// SCORING SYSTEM
// 3 pillars: Neighborhood, Structure, Price.
// Simple sum within each category. Each criterion has:
//   - score: points awarded
//   - max:   max possible points for that criterion
//   - value: the finding (short)
//   - note:  reasoning / source summary (shown when expanded)
//   - na:    true if data was insufficient to score (counts 0, max excluded from %)
// Full research log + sources: research-log.md
// Gardening base Seattle: ~$0.35/sqft/yr (range $0.15-$0.56). Yard = lot − footprint.
// ─────────────────────────────────────────────────────────────────────────────

const SCORES = {
  "1905-ne-125th": {
    neighborhood: [
      { key: "Segurança", max: 1, score: 0.5, value: "Victory Heights/Pinehurst ~na média nacional", note: "Niche/DoorProfit: Victory Heights mais seguro que 57% de Seattle, crime ~na média nacional. Pinehurst listado entre os mais seguros do norte. Risco moderado → 0.5." },
      { key: "Comute p/ 350 Westlake Ave N", max: 2, score: 1, value: "Norte; ~25-30 min carro, Link via Northgate", note: "Mais distante do centro. I-5 acessível mas norte; pico pode passar de 30 min. Pinehurst Link Station abre 2026 (ajuda futuro). Score parcial." },
      { key: "Distância da Aurora Ave", max: 1, score: 0.5, value: "125th cruza a Aurora; corredor relativamente próximo", note: "1905 NE 125th fica a leste mas na MESMA arterial (125th) que cruza a Aurora Ave N. Relativamente perto do corredor → score parcial." },
      { key: "Mercados (Safeway/PCC/WF) ≤2mi", max: 1, score: 1, value: "Safeway 15th Ave NE / Northgate dentro de ~2mi", note: "Safeway 12318 15th Ave NE próximo; opções em Northgate. Dentro de 2mi." },
      { key: "Academias (≤15 min carro)", max: 1, score: 1, value: "Northgate (24h, SAC, Anytime) <10-15 min", note: "Cluster de Northgate acessível: 24 Hour Fitness, Seattle Athletic Club, Anytime Fitness (98125)." },
      { key: "Longe de ruas movimentadas", max: 1, score: 0, value: "Fica EM NE 125th St — arterial movimentada", note: "SDOT: NE 125th é arterial menor com bus stops, semáforos, limite 30mph e histórico de colisões. A casa está sobre a arterial, não a ≥1 quarteirão → 0." },
      { key: "Parques/lazer (≤4mi)", max: 1, score: 1, value: "Vários parques na região (Pinehurst/Victory Heights)", note: "Pinehurst tem 'a lot of parks' (Niche). Dentro de 4mi com folga." },
      { key: "Perfil cultural/demográfico", max: 0, score: 0, value: "~10k hab; jovens profissionais, liberal, mais aluguel", note: "INFORMATIVO (sem pontos). Pop. ~9.984, urbano com pegada suburbana, muitos jovens profissionais e renters, perfil liberal. Escolas bem avaliadas." },
    ],
    structure: [
      { key: "≥2 banheiros", max: 2, score: 1.5, value: "3 banheiros (2 full, 1 half)", note: "Acima de 2. Score alto (não chega aos 4 da escala cheia)." },
      { key: "≥3 quartos", max: 2, score: 1.5, value: "3 quartos (todos no andar superior)", note: "Exatamente 3 quartos. Score alto." },
      { key: "Garagem", max: 1, score: 1, value: "Garagem destacada (2 vagas cobertas)", note: "Detached garage, 2 covered. Ponto." },
      { key: "Driveway", max: 1, score: 1, value: "Superfícies pavimentadas / acesso à garagem", note: "Garagem destacada implica driveway/acesso pavimentado. Ponto." },
      { key: "Open floor plan (andar da cozinha)", max: 1, score: 1, value: "Sim — 'open floor plan' explícito", note: "Listing afirma open floor plan, pé-direito alto e janelas amplas no principal. Ponto." },
      { key: "Backyard p/ churrasco", max: 1, score: 1, value: "Backyard grande, cercado, com flagstone patio", note: "'Large, fully fenced backyard' + flagstone patio, sun-filled. Ótimo p/ churrasco. Ponto." },
      { key: "Andares (≤2 = max, >3 perde)", max: 1, score: 1, value: "2 andares", note: "2 andares, sem porão. Dentro do ideal." },
      { key: "Ilha na cozinha", max: 1, score: null, na: true, value: "Não confirmado no listing", note: "Open kitchen mas ilha não mencionada. N/A." },
      { key: "Lava/seca no andar do master", max: 1, score: 1, value: "Laundry no mesmo andar dos 3 quartos", note: "Listing: laundry room no mesmo nível de todos os quartos (inclui master). Ponto." },
      { key: "Appliances novos", max: 1, score: 1, value: "Aparentam novos (casa atualizada, reno recente)", note: "Stainless + updates recentes, pre-inspection feita. Aparência nova. Ponto." },
      { key: "Appliances stainless steel", max: 1, score: 1, value: "Sim — stainless steel confirmado", note: "Listing confirma stainless steel appliances. Ponto." },
      { key: "Entrada afastada da rua (porch/escada/driveway)", max: 1, score: 1, value: "Recuo via garagem/driveway", note: "Garagem destacada + acesso afastam a entrada da rua. Ponto." },
      { key: "Fogão a gás", max: 1, score: null, na: true, value: "Tem gás (lareira a gás); fogão incerto", note: "Gas fireplace confirmado, mas tipo do fogão não. N/A." },
      { key: "Coifa", max: 1, score: null, na: true, value: "Não confirmado", note: "Sem menção a coifa. N/A." },
      { key: "Idade da casa (mais nova = mais pontos)", max: 2, score: 2, value: "Construída 2005 — moderna", note: "2005, uma das mais novas. Pontuação cheia (mais nova = mais pontos)." },
      { key: "Cama king no master", max: 1, score: null, na: true, value: "Suíte com walk-in, porte não confirmado", note: "Master tem ensuite e walk-in mas dimensão p/ king não confirmada. N/A." },
      { key: "Walk-in closet", max: 1, score: 1, value: "Sim, no master", note: "Listing confirma walk-in closet no master. Ponto." },
      { key: "Sala grande (sofá ≥3m)", max: 1, score: 1, value: "Living + family room amplos, pé-direito alto", note: "Family room espaçoso + living com pé-direito alto comportam sofá grande. Ponto." },
      { key: "Nº de closets (max: quartos+2)", max: 1, score: null, na: true, value: "Contagem total não informada", note: "Walk-in citado; total não informado. N/A." },
    ],
    price: [
      { key: "Custo de gardening (yard)", max: 2, score: 1, value: "~5.284 sqft de jardim → ~$1.849/ano", note: "Lote 7.214 − pegada ~1.930 ≈ 5.284 sqft de jardim. A $0,35/sqft/ano ≈ $1.849/ano — jardim grande → score menor." },
      { key: "HOA", max: 1, score: 1, value: "Sem HOA", note: "Listing: HOA $0. Ponto." },
      { key: "Não precisa de reforma", max: 1, score: 1, value: "Move-in ready (telhado/pintura/pisos novos)", note: "Move-in ready com telhado novo, pintura, pisos e pré-inspeção. Ponto." },
    ],
  },

  "2007-ne-137th": {
    neighborhood: [
      { key: "Segurança", max: 1, score: 0.5, value: "Pinehurst/Olympic Hills — médio", note: "Pinehurst entre os mais seguros do norte (Niche), mas Olympic Hills/Lake City têm pontos variáveis. Risco moderado → 0.5." },
      { key: "Comute p/ 350 Westlake Ave N", max: 2, score: 1, value: "Bem ao norte (~9mi); ~25-35 min, I-5/Link Northgate", note: "Um dos pontos mais ao norte. I-5 próxima; pico tende a passar de 30 min. Link via Northgate. Score parcial." },
      { key: "Distância da Aurora Ave", max: 1, score: 1, value: "Longe — lado leste, separada pela I-5", note: "2007 NE 137th fica a leste (Olympic Hills/Pinehurst), separada da Aurora (oeste) pela I-5 e pelo grid. Bem acima de 4 quarteirões → cheio." },
      { key: "Mercados (Safeway/PCC/WF) ≤2mi", max: 1, score: 1, value: "Fred Meyer, Target, Grocery Outlet (Lake City) ≤2mi", note: "Lake City Square: Fred Meyer, Target, Grocery Outlet, Costco próximos. Dentro de 2mi." },
      { key: "Academias (≤15 min carro)", max: 1, score: 1, value: "Northgate/Lake City <15 min", note: "Cluster de Northgate + opções em Lake City acessíveis em <15 min de carro." },
      { key: "Longe de ruas movimentadas", max: 1, score: 1, value: "NE 137th é rua residencial calma", note: "137th é rua residencial, não arterial. Olympic Hills é descrito como tranquilo/arborizado, sem business district interno. ≥1 quarteirão de vias movimentadas → ponto." },
      { key: "Parques/lazer (≤4mi)", max: 1, score: 1, value: "Jackson Park Golf, Albert Davis Park próximos", note: "Jackson Park Golf Course a oeste, Albert Davis Park (Lake City). Dentro de 4mi." },
      { key: "Perfil cultural/demográfico", max: 0, score: 0, value: "Lake City/Olympic Hills — diverso, residencial, classe média", note: "INFORMATIVO (sem pontos). Olympic Hills: residencial de casas dos anos 1900s, parte do distrito de Lake City — área diversa e em valorização." },
    ],
    structure: [
      { key: "≥2 banheiros", max: 2, score: 1, value: "2 banheiros (1 full, 1 ¾)", note: "Exatamente o mínimo de 2. Score baixo-médio (menos banheiros que as outras)." },
      { key: "≥3 quartos", max: 2, score: 1.5, value: "3 quartos", note: "Exatamente 3 quartos. Score alto." },
      { key: "Garagem", max: 1, score: 1, value: "Garagem anexa (1 vaga coberta)", note: "Attached garage, 1 covered. Ponto." },
      { key: "Driveway", max: 1, score: 1, value: "Driveway + várias vagas", note: "Driveway parking confirmado (6 vagas no total). Ponto." },
      { key: "Open floor plan (andar da cozinha)", max: 1, score: 1, value: "Rambler reimaginado, layout aberto", note: "Rambler (1 andar) extensivamente reformado, cozinha integrada às áreas sociais. Layout aberto. Ponto." },
      { key: "Backyard p/ churrasco", max: 1, score: 1, value: "Yard cercado, patio de festa, swim spa", note: "Fully fenced yard, expansive entertaining patio, covered lounge, swim spa. Excelente p/ churrasco. Ponto." },
      { key: "Andares (≤2 = max, >3 perde)", max: 1, score: 1, value: "1 andar (rambler)", note: "1 andar — dentro do ideal (≤2). Ponto." },
      { key: "Ilha na cozinha", max: 1, score: null, na: true, value: "Cozinha custom; ilha não confirmada", note: "Custom cabinetry + quartz mas ilha não mencionada explicitamente. N/A." },
      { key: "Lava/seca no andar do master", max: 1, score: 1, value: "Laundry no walk-in do master (mesmo andar)", note: "Listing: 'walk-in closet with laundry' no master. Como é rambler (1 andar), está no mesmo nível. Ponto." },
      { key: "Appliances novos", max: 1, score: 1, value: "Sim — LG Café premium, reforma 2024", note: "Premium LG Café appliances, reforma extensa recente. Novos. Ponto." },
      { key: "Appliances stainless steel", max: 1, score: null, na: true, value: "LG Café premium; acabamento não confirmado", note: "LG Café costuma ter linha stainless e linha colorida; acabamento exato não confirmado. N/A." },
      { key: "Entrada afastada da rua (porch/escada/driveway)", max: 1, score: 1, value: "Driveway + recuo do rambler", note: "Driveway e recuo afastam a porta da rua. Ponto." },
      { key: "Fogão a gás", max: 1, score: 1, value: "Sim — 6-burner gas range + double ovens", note: "Listing confirma six-burner gas range com double ovens. Ponto." },
      { key: "Coifa", max: 1, score: null, na: true, value: "Cozinha gourmet; coifa não confirmada", note: "Range gourmet sugere exaustão, mas coifa não confirmada no texto. N/A." },
      { key: "Idade da casa (mais nova = mais pontos)", max: 2, score: 1.5, value: "1952, mas reforma completa 2024", note: "Estrutura de 1952 (antiga) PORÉM reforma extensa em 2024 (novo painel, sewer, PEX, janelas, siding). Quase como nova → score alto." },
      { key: "Cama king no master", max: 1, score: null, na: true, value: "Master com walk-in; porte p/ king incerto", note: "Master tem bath custom e walk-in mas dimensão p/ king não confirmada. N/A." },
      { key: "Walk-in closet", max: 1, score: 1, value: "Sim, no master", note: "Listing confirma walk-in closet no master. Ponto." },
      { key: "Sala grande (sofá ≥3m)", max: 1, score: 1, value: "Living + dining amplos, oak flooring", note: "Living room + dining room amplos com janelas grandes. Comporta sofá grande. Ponto." },
      { key: "Nº de closets (max: quartos+2)", max: 1, score: null, na: true, value: "Contagem total não informada", note: "Walk-in do master citado; total não informado. N/A." },
    ],
    price: [
      { key: "Custo de gardening (yard)", max: 2, score: 1.5, value: "~3.240 sqft de jardim → ~$1.134/ano", note: "Lote 5.000 − pegada ~1.760 ≈ 3.240 sqft de jardim. A $0,35/sqft/ano ≈ $1.134/ano — médio. (Tem landscaping maduro: figo, ruibarbo, uva.)" },
      { key: "HOA", max: 1, score: 1, value: "Sem HOA", note: "Listing: HOA $0. Ponto." },
      { key: "Não precisa de reforma", max: 1, score: 1, value: "Turnkey (reforma completa 2024)", note: "Extensivamente reimaginado, turnkey, sistemas novos. Sem reforma necessária. Ponto." },
    ],
  },

  "13721-meridian": {
    neighborhood: [
      { key: "Segurança", max: 1, score: 0, value: "Haller Lake — 21º percentil; lado oeste mais arriscado", note: "NeighborhoodScout/CrimeGrade: Haller Lake mais seguro que só 21% dos bairros; violência 7,4/1.000. Lado OESTE (onde fica Meridian, perto da Aurora) é o mais arriscado (1 em 70). → 0." },
      { key: "Comute p/ 350 Westlake Ave N", max: 2, score: 1, value: "Norte (~9mi); bus 345/346/75, Link 130th (2026)", note: "Bem ao norte. Aurora (RapidRide E) e bus 345/346/75 próximos; futura estação Link NE 130th (2026). Carro no pico passa de 30 min. Score parcial." },
      { key: "Distância da Aurora Ave", max: 1, score: 0, value: "~1 quarteirão da Aurora Ave N (muito perto)", note: "13721 Meridian Ave N fica ~1 quarteirão a leste da Aurora Ave N (137th & Aurora se cruzam). Bem abaixo do mínimo de 4 quarteirões → 0." },
      { key: "Mercados (Safeway/PCC/WF) ≤2mi", max: 1, score: 1, value: "Mercados ao longo da Aurora/Northgate ≤2mi", note: "Corredor da Aurora e Northgate com mercados dentro de 2mi." },
      { key: "Academias (≤15 min carro)", max: 1, score: 1, value: "Northgate/Bitter Lake <15 min", note: "Academias de Northgate e Bitter Lake acessíveis em <15 min de carro." },
      { key: "Longe de ruas movimentadas", max: 1, score: 0, value: "1 quarteirão da Aurora (arterial principal)", note: "A ~1 quarteirão da Aurora Ave N — uma das arteriais mais movimentadas de Seattle (em projeto de segurança da SDOT). Não atende ao mínimo de ≥1 quarteirão de buffer real → 0." },
      { key: "Parques/lazer (≤4mi)", max: 1, score: 1, value: "Parque da HOA adjacente + Haller Lake access", note: "Adjacente a parque gerido pela HOA; acesso público ao Haller Lake e Madison Pool a pé. Dentro de 4mi." },
      { key: "Perfil cultural/demográfico", max: 0, score: 0, value: "Renda alta; 24% nasc. fora do país; diverso, liberal", note: "INFORMATIVO (sem pontos). Pop. ~8.302; renda acima da média (top 22% dos EUA); 24,2% nascidos no exterior; mix inglês/asiático/alemão; jovens profissionais, liberal, maioria proprietária." },
    ],
    structure: [
      { key: "≥2 banheiros", max: 2, score: 1.5, value: "3 banheiros (2 full, 1 half)", note: "Acima de 2. Score alto." },
      { key: "≥3 quartos", max: 2, score: 1.5, value: "3 quartos (todos no andar superior)", note: "Exatamente 3 quartos. Score alto." },
      { key: "Garagem", max: 1, score: 1, value: "Garagem anexa (2 vagas)", note: "2-car attached garage. Ponto." },
      { key: "Driveway", max: 1, score: 1, value: "Driveway (EV-ready)", note: "Driveway confirmado, EV-ready. Ponto." },
      { key: "Open floor plan (andar da cozinha)", max: 1, score: 1, value: "Sim — open floor plan / great room", note: "Listing: open floor plan conectando cozinha ao great room. Ponto." },
      { key: "Backyard p/ churrasco", max: 1, score: 1, value: "Yard cercado com patio (gramado artificial)", note: "Private fenced yard com patio e gramado artificial low-maintenance. Bom p/ churrasco (área menor). Ponto." },
      { key: "Andares (≤2 = max, >3 perde)", max: 1, score: 1, value: "2 andares", note: "2 andares. Dentro do ideal." },
      { key: "Ilha na cozinha", max: 1, score: null, na: true, value: "Cozinha custom; ilha não confirmada", note: "European-style cabinetry + quartz, eating space, mas ilha não mencionada. N/A." },
      { key: "Lava/seca no andar do master", max: 1, score: 1, value: "Utility room no andar superior (com o master)", note: "Listing: dedicated utility room no upper level, mesmo andar do master. Ponto." },
      { key: "Appliances novos", max: 1, score: 1, value: "Energy-efficient, casa de 2014 Built Green", note: "Appliances stainless energy-efficient, construção 2014 Built Green 3-Star. Novos/modernos. Ponto." },
      { key: "Appliances stainless steel", max: 1, score: 1, value: "Sim — stainless steel confirmado", note: "Listing: energy-efficient stainless steel appliances. Ponto." },
      { key: "Entrada afastada da rua (porch/escada/driveway)", max: 1, score: 1, value: "Recuo via driveway/garagem (corner lot)", note: "Driveway + garagem anexa em corner lot afastam a entrada da rua. Ponto." },
      { key: "Fogão a gás", max: 1, score: null, na: true, value: "Tem gás (lareira); fogão/stove tipo incerto", note: "Gas fireplace confirmado; stove/range fica mas tipo (gás/elétrico) não confirmado. N/A." },
      { key: "Coifa", max: 1, score: null, na: true, value: "Não confirmado", note: "Sem menção a coifa. N/A." },
      { key: "Idade da casa (mais nova = mais pontos)", max: 2, score: 2, value: "Construída 2014 — a mais nova", note: "2014, a mais nova do grupo. Pontuação cheia." },
      { key: "Cama king no master", max: 1, score: null, na: true, value: "Master suite com spa bath/walk-in; porte incerto", note: "Master com spa bath e walk-in mas dimensão p/ king não confirmada. N/A." },
      { key: "Walk-in closet", max: 1, score: 1, value: "Sim, no master", note: "Listing confirma walk-in closet no master. Ponto." },
      { key: "Sala grande (sofá ≥3m)", max: 1, score: 1, value: "Great room + bonus room", note: "Great room amplo + bonus room no 2º andar. Comporta sofá grande. Ponto." },
      { key: "Nº de closets (max: quartos+2)", max: 1, score: null, na: true, value: "Contagem total não informada", note: "Walk-in citado; total não informado. N/A." },
    ],
    price: [
      { key: "Custo de gardening (yard)", max: 2, score: 2, value: "~1.828 sqft + gramado artificial → mais barato", note: "Lote 3.995 − pegada ~2.167 ≈ 1.828 sqft de jardim, E gramado ARTIFICIAL low-maintenance. Custo de gardening mínimo → score cheio. (~$640/ano se fosse natural; menos com artificial.)" },
      { key: "HOA", max: 1, score: 0, value: "Tem HOA — $85/mês", note: "Listing: HOA $85/mês (parque gerido pela HOA). Conforme a regra, TER HOA não pontua → 0." },
      { key: "Não precisa de reforma", max: 1, score: 1, value: "Move-in ready (construção 2014 Built Green)", note: "Meticulously crafted, move-in ready, construção 2014. Sem reforma. Ponto." },
    ],
  },
};
