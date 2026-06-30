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
// Scale rationale documented at the bottom of this file.
// ─────────────────────────────────────────────────────────────────────────────

const SCORES = {
  "1528-ne-97th": {
    neighborhood: [
      { key: "Segurança", max: 1, score: 0.5, value: "Grade B+ — crime ~21% acima da média nacional", note: "Niche/CrimeGrade: Maple Leaf é mais seguro que 41% dos bairros de Seattle. Larceny/furto é o ponto fraco (index 131). Risco moderado → 0.5." },
      { key: "Comute p/ 350 Westlake Ave N", max: 2, score: 1.5, value: "~20 min off-peak / 35-50 min pico via I-5", note: "Sound Team Realty: I-5 dá ~20 min fora de pico. Acima de 30 min no pico tira pontos. Acesso direto à I-5 ajuda. Link via Roosevelt/Northgate ~13-18 min." },
      { key: "Distância da Aurora Ave", max: 1, score: 1, value: "Longe — separada pela I-5 (>1 milha)", note: "97th St (lado leste) é separada da Aurora Ave N (lado oeste) pela I-5. Bem acima do mínimo de 4 quarteirões. Pontuação cheia." },
      { key: "Mercados (Safeway/PCC/WF) ≤2mi", max: 1, score: 1, value: "Safeway 15th Ave NE e Roosevelt Way NE dentro de ~2mi", note: "Safeway em 12318 15th Ave NE e 7300 Roosevelt Way NE, ambos próximos. Dentro do raio de 2 milhas." },
      { key: "Academias (≤15 min carro)", max: 1, score: 1, value: "24h Fitness, Seattle Athletic Club (Northgate) <10 min", note: "Cluster de academias em Northgate a poucos minutos: 24 Hour Fitness Northgate, Seattle Athletic Club, Anytime Fitness." },
      { key: "Longe de ruas movimentadas", max: 1, score: 1, value: "Rua residencial tranquila, grid arborizado", note: "Portico/guias descrevem 97th como rua residencial calma. Buffer da I-5 e sem arterial colado. ≥1 quarteirão de vias movimentadas." },
      { key: "Parques/lazer (≤4mi)", max: 1, score: 1, value: "Maple Leaf Reservoir Park (16 acres) muito próximo", note: "Maple Leaf Reservoir Park a poucos quarteirões (campos, playground, zip line) + corredores do Thornton Creek. Bem dentro de 4mi." },
      { key: "Perfil cultural/demográfico", max: 0, score: 0, value: "Bairro familiar, diverso; maior grupo asiático (17,5%)", note: "INFORMATIVO (sem pontos). ~7.600 hab, idade mediana 37, 40%+ dos lares com crianças. Tido como familiar, 'urban sophisticates', diverso. Inglês 79,8%." },
    ],
    structure: [
      { key: "≥2 banheiros", max: 2, score: 2, value: "4 banheiros (2 full, 1 ¾, 1 half)", note: "Bem acima de 2. Pontuação cheia na escala (4+ banheiros)." },
      { key: "≥3 quartos", max: 2, score: 2, value: "4 quartos (todos no andar superior)", note: "Acima de 3 quartos. Pontuação cheia." },
      { key: "Garagem", max: 1, score: 0, value: "Sem garagem", note: "Listing: 'No' garagem/carport. Sem pontos." },
      { key: "Driveway", max: 1, score: 1, value: "Driveway com 2 vagas descobertas", note: "Listing confirma driveway parking (2 uncovered). Ponto." },
      { key: "Open floor plan (andar da cozinha)", max: 1, score: 1, value: "Great Room + Family Room + kitchen eating space", note: "Listing lista Great Room-Main, Family Room-Main, kitchen with eating space — layout aberto no principal." },
      { key: "Backyard p/ churrasco", max: 1, score: null, na: true, value: "Não descrito no listing", note: "Backyard não descrito. Dados insuficientes → N/A." },
      { key: "Andares (≤2 = max, >3 perde)", max: 1, score: 1, value: "2 andares + porão", note: "2 andares (porão não conta como andar penalizável). Dentro do ideal." },
      { key: "Ilha na cozinha", max: 1, score: null, na: true, value: "Não confirmado no listing", note: "Sem menção a ilha. N/A." },
      { key: "Lava/seca no andar do master", max: 1, score: 0, value: "Utility room no porão (master no 2º andar)", note: "Listing indica utility room no lower level; master no 2º andar. Não está no mesmo andar → 0." },
      { key: "Appliances novos", max: 1, score: null, na: true, value: "Reno 2004, novidade atual incerta", note: "Renovado em 2004, mas estado atual dos appliances não confirmado. N/A." },
      { key: "Appliances stainless steel", max: 1, score: null, na: true, value: "Não confirmado", note: "Material dos appliances não especificado. N/A." },
      { key: "Entrada afastada da rua (porch/escada/driveway)", max: 1, score: 1, value: "Driveway afasta a entrada da rua", note: "Possui driveway, o que afasta a porta da rua direta. Ponto." },
      { key: "Fogão a gás", max: 1, score: null, na: true, value: "Tem gás natural; tipo do fogão incerto", note: "Casa tem natural gas, mas não confirma fogão a gás especificamente. N/A." },
      { key: "Coifa", max: 1, score: null, na: true, value: "Não confirmado", note: "Sem menção a coifa/range hood. N/A." },
      { key: "Idade da casa (mais nova = mais pontos)", max: 2, score: 1, value: "Construída 1927, reno completa 2004", note: "Estrutura de 1927 (antiga) mas renovada aos studs em 2004. Pontuação parcial pela reno." },
      { key: "Cama king no master", max: 1, score: 1, value: "Suíte ampla com pé-direito alto e deck", note: "Vaulted primary suite com deck privativo e walk-in — porte compatível com cama king. Ponto." },
      { key: "Walk-in closet", max: 1, score: 1, value: "Sim, no primary suite", note: "Listing confirma walk-in closet na suíte. Ponto." },
      { key: "Sala grande (sofá ≥3m)", max: 1, score: 1, value: "Great Room + Living Room amplos", note: "Múltiplas salas amplas (Great Room, Living Room) comportam sofá grande. Ponto." },
      { key: "Nº de closets (max: quartos+2)", max: 1, score: null, na: true, value: "Contagem total não informada", note: "Só o walk-in da suíte é citado; total de closets não informado. N/A." },
    ],
    price: [
      { key: "Custo de gardening (yard)", max: 2, score: 1.5, value: "~$2.130 / 2.129 sqft de jardim/ano", note: "Lote 5.109 sqft − pegada ~2.980 sqft ≈ 2.129 sqft de jardim. A $0,35/sqft/ano (média Seattle) ≈ $745/ano de manutenção de jardim — relativamente barato → bom score. (Estimativa de pegada.)" },
      { key: "HOA", max: 1, score: 1, value: "Sem HOA", note: "Listing: HOA $0. Ponto." },
      { key: "Não precisa de reforma", max: 1, score: 1, value: "Move-in ready (reno aos studs em 2004)", note: "Descrito como move-in ready com sistemas modernos. Sem reforma necessária → ponto." },
    ],
  },

  "1905-ne-125th": {
    neighborhood: [
      { key: "Segurança", max: 1, score: 0.5, value: "Victory Heights/Pinehurst ~na média nacional", note: "Niche/DoorProfit: Victory Heights mais seguro que 57% de Seattle, crime ~na média nacional. Pinehurst listado entre os mais seguros do norte. Risco moderado → 0.5." },
      { key: "Comute p/ 350 Westlake Ave N", max: 2, score: 1, value: "Mais ao norte; ~25-30 min carro, Link via Northgate", note: "Mais distante do centro que Maple Leaf. I-5 acessível mas mais norte; pico pode passar de 30 min. Pinehurst Link Station abre 2026 (ajuda futuro). Score parcial." },
      { key: "Distância da Aurora Ave", max: 1, score: 0.5, value: "125th cruza a Aurora; corredor relativamente próximo", note: "1905 NE 125th fica a leste mas na MESMA arterial (125th) que cruza a Aurora Ave N. Mais perto do corredor Aurora que Maple Leaf → score parcial." },
      { key: "Mercados (Safeway/PCC/WF) ≤2mi", max: 1, score: 1, value: "Safeway 15th Ave NE / Northgate dentro de ~2mi", note: "Safeway 12318 15th Ave NE próximo; opções em Northgate. Dentro de 2mi." },
      { key: "Academias (≤15 min carro)", max: 1, score: 1, value: "Northgate (24h, SAC, Anytime) <10-15 min", note: "Mesmo cluster de Northgate acessível: 24 Hour Fitness, Seattle Athletic Club, Anytime Fitness (98125)." },
      { key: "Longe de ruas movimentadas", max: 1, score: 0, value: "Fica EM NE 125th St — arterial movimentada", note: "SDOT: NE 125th é arterial menor com bus stops, semáforos, limite 30mph e histórico de colisões. A casa está sobre a arterial, não a ≥1 quarteirão → 0." },
      { key: "Parques/lazer (≤4mi)", max: 1, score: 1, value: "Vários parques na região (Pinehurst/Victory Heights)", note: "Pinehurst tem 'a lot of parks' (Niche). Dentro de 4mi com folga." },
      { key: "Perfil cultural/demográfico", max: 0, score: 0, value: "~10k hab; jovens profissionais, liberal, mais aluguel", note: "INFORMATIVO (sem pontos). Pop. ~9.984, urbano com pegada suburbana, muitos jovens profissionais e renters, perfil liberal. Escolas bem avaliadas." },
    ],
    structure: [
      { key: "≥2 banheiros", max: 2, score: 1.5, value: "3 banheiros (2 full, 1 half)", note: "Acima de 2 mas menos que a Maple Leaf (4). Score alto." },
      { key: "≥3 quartos", max: 2, score: 1.5, value: "3 quartos (todos no andar superior)", note: "Exatamente 3 quartos (mínimo da pontuação cheia da lógica). Score alto." },
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
      { key: "Custo de gardening (yard)", max: 2, score: 1, value: "~$5.284 sqft de jardim/ano — lote maior", note: "Lote 7.214 sqft − pegada ~1.930 sqft ≈ 5.284 sqft de jardim. A $0,35/sqft/ano ≈ $1.849/ano — mais caro que a Maple Leaf (jardim ~2,5x maior) → score menor." },
      { key: "HOA", max: 1, score: 1, value: "Sem HOA", note: "Listing: HOA $0. Ponto." },
      { key: "Não precisa de reforma", max: 1, score: 1, value: "Move-in ready (telhado novo, pintura, pisos)", note: "Move-in ready com telhado novo, pintura, pisos e pré-inspeção. Ponto." },
    ],
  },
};

// ── Scale rationale (resumo) ──────────────────────────────────────────────────
// Vizinhança: máx ~8 pts (perfil cultural = informativo, 0 pts).
// Estrutura: máx ~22 pts (vários quesitos N/A por falta de dado no listing).
// Preço: máx 4 pts.
// Gardening base Seattle: ~$0,35/sqft/ano (faixa $0,15-$0,56). Yard = lote − pegada do imóvel.
