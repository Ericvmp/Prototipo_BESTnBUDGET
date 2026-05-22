const fs = require('fs');

// We have the transpired translationDictionary.cjs, let's load the existing itemTranslations
const dictCjs = require('./translationDictionary.cjs');
const existingTranslations = dictCjs.itemTranslations || {};

// All the new translations we want to merge/inject
const newTranslations = {
  // --- WEAPONS ---
  "Rattler": {
    name: "Rattler",
    description: "Pistola semiautomática ágil e de alta precisão. Excelente como arma secundária confiável."
  },
  "Arpeggio": {
    name: "Arpeggio",
    description: "Pistola de rajada compacta e de disparo rápido, ideal para encontros de curta distância."
  },
  "Tempest": {
    name: "Tempest",
    description: "Submetralhadora leve com altíssima cadência de tiro, destruidora de alvos próximos."
  },
  "Bettina": {
    name: "Bettina",
    description: "Lança-granadas tático de precisão. Dispara projéteis explosivos em arco."
  },
  "Bobcat": {
    name: "Bobcat",
    description: "Rifle de assalto versátil com excelente controle de recuo e cadência balanceada."
  },
  "Vulcano": {
    name: "Vulcano",
    description: "Metralhadora leve pesada com enorme capacidade de munição para fogo de supressão."
  },
  "Hairpin": {
    name: "Hairpin",
    description: "Pistola de pregos de alta pressão, silenciosa e mortal."
  },
  "Hullcracker": {
    name: "Hullcracker",
    description: "Escopeta de cano duplo clássica de alto impacto a curtíssima distância."
  },
  "Ferro": {
    name: "Ferro",
    description: "Revólver pesado de calibre massivo. Cada disparo causa dano devastador."
  },
  "Stitcher": {
    name: "Stitcher",
    description: "Rifle de precisão semiautomático projetado para engajamentos de médio a longo alcance."
  },
  "Kettle": {
    name: "Kettle",
    description: "Lança-chamas caseiro devastador que incinera hordas de robôs ARC."
  },
  "Il Toro": {
    name: "Il Toro",
    description: "Rifle de precisão de ferrolho potente, capaz de perfurar blindagens pesadas."
  },
  "Anvil": {
    name: "Anvil",
    description: "Rifle de assalto pesado de calibre robusto com tiros lentos de alto impacto."
  },
  "Burletta": {
    name: "Burletta",
    description: "Escopeta automática devastadora para combate frenético em área."
  },
  "Renegade": {
    name: "Renegade",
    description: "Rifle tático de precisão com modo de disparo alternado ágil."
  },
  "Venator": {
    name: "Venator",
    description: "Rifle eletromagnético experimental que dispara flechettes energizadas de alta velocidade."
  },
  "Osprey": {
    name: "Osprey",
    description: "Rifle de rajada de precisão tático, balanceado para todas as distâncias."
  },
  "Torrente": {
    name: "Torrente",
    description: "Metralhadora rotativa leve de alta tecnologia. Requer aquecimento antes de disparar."
  },
  "Canto": {
    name: "Canto",
    description: "Lança-foguetes devastador de longo alcance. Destruição garantida."
  },
  "Dolabra": {
    name: "Dolabra",
    description: "Dispositivo de combate de proximidade com lâmina vibratória de alta frequência."
  },
  "Shredder Gyro": {
    name: "Shredder Gyro",
    description: "Mecanismo rotativo giroscópico tático para disparos de fragmentação."
  },
  "Vaporizer Regulator": {
    name: "Vaporizer Regulator",
    description: "Módulo regulador de plasma térmico para dispersão em cone de calor extremo."
  },

  // --- THROWABLES & EQUIPMENTS ---
  "Trigger 'Nade": {
    name: "Granada de Impacto Manual",
    description: "Granada acionada à distância por um gatilho de rádio tático."
  },
  "Trigger Nade": {
    name: "Granada de Impacto Manual",
    description: "Granada acionada à distância por um gatilho de rádio tático."
  },
  "Gas Grenade": {
    name: "Granada de Gás",
    description: "Libera uma cortina tóxica densa e altamente corrosiva em área."
  },
  "Lure Grenade": {
    name: "Granada Chamariz",
    description: "Projeta hologramas sonoros que enganam sensores de IA e atraem inimigos robóticos."
  },
  "Gas Mine": {
    name: "Mina de Gás",
    description: "Dispositivo de pressão defensivo que explode cobrindo a área com névoa corrosiva."
  },
  "Pulse Mine": {
    name: "Mina de Pulso",
    description: "Cria um campo desacelerador intermitente que sabota a mobilidade mecânica ARC."
  },
  "Bandage": {
    name: "Bandagem",
    description: "Bandagem de pano simples para curativo de emergência rápido."
  },
  "Adrenaline Shot": {
    name: "Injeção de Adrenalina",
    description: "Estimulante sintético militar que acelera o metabolismo e regenera vida."
  },
  "Barricade Kit": {
    name: "Kit de Barricada",
    description: "Barreira tática compacta para proteção imediata contra fogo inimigo no campo."
  },

  // --- AUGMENTS ---
  "Tactical Mk. 3 (Revival)": {
    name: "Tático Mk. 3 (Reanimação)",
    description: "Módulo de suporte avançado que melhora drasticamente a velocidade de reanimação de aliados.",
    perks: "Velocidade de reanimação aumentada em 50% e concede escudo temporário ao aliado reanimado."
  },
  "Combat Mk. 1": {
    name: "Combate Mk. 1",
    description: "Armadura de combate básica para proteção inicial.",
    perks: "Suporta Escudo Leve, aumento moderado na resistência a danos mecânicos."
  },
  "Looting Mk. 1": {
    name: "Coleta Mk. 1",
    description: "Módulo utilitário leve projetado para aumentar a eficiência de coleta.",
    perks: "+10% de velocidade de corrida ao carregar sacos pesados e +2 espaços de mochila."
  },
  "Tactical Mk. 1": {
    name: "Tático Mk. 1",
    description: "Módulo tático básico que fornece suporte de utilidade básico no campo.",
    perks: "+1 espaço de Quick Use e recarga 10% mais rápida de habilidades utilitárias."
  },
  "Combat Mk. 3 (Aggressive)": {
    name: "Combate Mk. 3 (Agressivo)",
    description: "Construído para assalto na linha de frente. Alta integridade de escudo e otimizado para implantação de recursos ofensivos.",
    perks: "+2 espaços de granada e regeneração de 2 HP a cada 5 s (pausa por 30 s ao sofrer dano)."
  },
  "Combat Mk.3 (Aggressive)": {
    name: "Combate Mk. 3 (Agressivo)",
    description: "Construído para assalto na linha de frente. Alta integridade de escudo e otimizado para implantação de recursos ofensivos.",
    perks: "+2 espaços de granada e regeneração de 2 HP a cada 5 s (pausa por 30 s ao sofrer dano)."
  },
  "Combat Mk. 3 (Flanking)": {
    name: "Combate Mk. 3 (Flanco)",
    description: "Otimizado para mobilidade ofensiva de flanco e ataques de surpresa devastadores.",
    perks: "+15% de velocidade de movimento ao correr e +20% de dano pelas costas do inimigo."
  },
  "Looting Mk. 2": {
    name: "Coleta Mk. 2",
    description: "Módulo utilitário intermediário que aumenta significativamente a capacidade de transporte e velocidade de saque.",
    perks: "+15% de velocidade de saque, +4 espaços de mochila e +10kg de capacidade de peso máximo."
  },
  "Looting Mk. 3 (Cautious)": {
    name: "Coleta Mk. 3 (Cauteloso)",
    description: "Projetado para sobrevivência furtiva de saqueadores solitários.",
    perks: "Passos silenciosos a 50% de distância, raio de detecção de inimigos reduzido no minimapa."
  },
  "Looting Mk. 3 (Safekeeper)": {
    name: "Coleta Mk. 3 (Guardião)",
    description: "Garante proteção máxima para os saques mais preciosos obtidos nas incursões.",
    perks: "O Bolso Seguro aceita qualquer tipo de item (incluindo armas) protegendo-os de perda na morte."
  },
  "Looting MK. 3 (Safekeeper)": {
    name: "Coleta Mk. 3 (Guardião)",
    description: "Garante proteção máxima para os saques mais preciosos obtidos nas incursões.",
    perks: "O Bolso Seguro aceita qualquer tipo de item (incluindo armas) protegendo-os de perda na morte."
  },
  "Looting Mk. 3 (Survivor)": {
    name: "Coleta Mk. 3 (Sobrevivente)",
    description: "Focado em expedições de longa duração em condições ambientais severas.",
    perks: "+25kg de peso máximo de carga e +5 espaços de mochila para transporte massivo."
  },
  "Looting MK. 3 (Survivor)": {
    name: "Coleta Mk. 3 (Sobrevivente)",
    description: "Focado em expedições de longa duração em condições ambientais severas.",
    perks: "+25kg de peso máximo de carga e +5 espaços de mochila para transporte massivo."
  },
  "Tactical Mk. 2": {
    name: "Tático Mk. 2",
    description: "Módulo de suporte avançado que aprimora o uso de utilitários e táticos de médio escalão.",
    perks: "+2 slots de utilitários rápidos e redução de 20% no cooldown de todos os arremessáveis."
  },
  "Tactical Mk. 3 (Defensive)": {
    name: "Tático Mk. 3 (Defensivo)",
    description: "Módulo de engenharia militar voltado para fortificação defensiva imediata.",
    perks: "+1 slot de utilitários rápidos e cortina de fumaça automática de emergência ao quebrar o escudo."
  },
  "Tactical MK.3 (Defensive)": {
    name: "Tático Mk. 3 (Defensivo)",
    description: "Módulo de engenharia militar voltado para fortificação defensiva imediata.",
    perks: "+1 slot de utilitários rápidos e cortina de fumaça automática de emergência ao quebrar o escudo."
  },
  "Tactical Mk. 3 (Healing)": {
    name: "Tático Mk. 3 (Cura)",
    description: "O melhor suporte médico do Scrappy Hub. Campo biótico de cura aprimorado.",
    perks: "+3 slots de cura rápida e cria uma nuvem de cura em área (~20 HP em 10 s) ao reanimar um parceiro."
  },
  "Tactical MK.3 (Healing)": {
    name: "Tático Mk. 3 (Cura)",
    description: "O melhor suporte médico do Scrappy Hub. Campo biótico de cura aprimorado.",
    perks: "+3 slots de cura rápida e cria uma nuvem de cura em área (~20 HP em 10 s) ao reanimar um parceiro."
  },
  "Combat Mk. 2": {
    name: "Combate Mk. 2",
    description: "Módulo militar robusto para proteção intermediária em batalhas intensas contra robôs.",
    perks: "Suporta Escudo Médio, concede +15% de integridade máxima de escudos táticos equipados."
  },

  // --- MODS ---
  "Shotgun Silencer": {
    name: "Silenciador de Escopeta",
    description: "Supressão acústica e dispersão de gases para disparos de escopeta discretos."
  },

  // --- BLUEPRINTS ---
  "Red Light Stick": {
    name: "Bastão de Luz Vermelha",
    description: "Sinalizador brilhante vermelho usado para demarcar pontos ou distrair."
  },
  "Tagging Grenade": {
    name: "Granada de Marcação",
    description: "Libera sensores de eco para rastrear inimigos através de superfícies."
  },
  "Crash Mat": {
    name: "Amortecedor de Quedas",
    description: "Colchão de ar de alta absorção de impacto contra quedas extremas."
  },
  "Tactical MK.3 (Smoke)": {
    name: "Tático MK.3 (Fumaça)",
    description: "Módulo especializado em ocultação térmica e fumaça em larga escala."
  },
  "White Flag": {
    name: "Bandeira Branca",
    description: "Dispositivo simbólico que reduz a hostilidade de IAs próximas temporariamente."
  },
  "Remote Raider Flare": {
    name: "Sinalizador Raider Remoto",
    description: "Dispositivo de iluminação tática disparado à distância."
  },
  "Aphelion Rifle": {
    name: "Rifle Aphelion",
    description: "Projeto do lendário rifle eletromagnético militar de precisão extrema."
  },
  "Powered Descender": {
    name: "Descensor Motorizado",
    description: "Equipamento motorizado de alta velocidade para cabos e rapel tático."
  },
  "Trailblazer Grenade": {
    name: "Granada Trailblazer",
    description: "Dispositivo sinalizador de rastreamento com varredura persistente."
  },
  "Green Light Stick": {
    name: "Bastão de Luz Verde",
    description: "Sinalizador de luz fria verde de alta duração."
  },
  "Padded Stock": {
    name: "Coronha Acolchoada",
    description: "Melhora o conforto físico e reduz a oscilação da mira sob fogo intenso."
  },
  "Fireworks Box": {
    name: "Caixa de Fogos de Artifício",
    description: "Mistura pirotécnica improvisada para sinalização ou distração caótica."
  },
  "Yellow Light Stick": {
    name: "Bastão de Luz Amarela",
    description: "Sinalizador de visibilidade amarela para condições de névoa densa."
  },
  "Surge Coil": {
    name: "Bobina de Sobrecarga",
    description: "Dispositivo de indução eletromagnética para sobrecarga ativa de escudos."
  },
  "Blue Light Stick": {
    name: "Bastão de Luz Azul",
    description: "Sinalizador de luz azul de alta visibilidade subaquática e noturna."
  },

  // --- LOOT / SALVAGE ---
  "Adv Mechanical Components": {
    name: "Componentes Mecânicos Avançados",
    description: "Engrenagens e pistões usinados a laser para engenharia de alta performance."
  },
  "Adv ARC Powercell": {
    name: "Célula de Energia ARC Avançada",
    description: "Núcleo gerador de fusão fria de classe superior de robôs ARC."
  },
  "Adv Electrical Components": {
    name: "Componentes Elétricos Avançados",
    description: "Microprocessadores blindados contra radiação e pulsos eletromagnéticos."
  },
  "Padded Stock III": {
    name: "Coronha Acolchoada III",
    description: "Estabilização balística máxima, minimizando totalmente a oscilação."
  },
  "Aphelion": {
    name: "Aphelion",
    description: "Rifle eletromagnético lendário de alta tecnologia e precisão avassaladora."
  },
  "Jupiter": {
    name: "Jupiter",
    description: "Fuzil de assalto pesado experimental de alta cadência e dano cinético extremo."
  },
  "Equalizer": {
    name: "Equalizer",
    description: "Canhão de mão de alta precisão com projéteis explosivos de liga exótica."
  },
  "Zipline": {
    name: "Tirolesa",
    description: "Mecanismo portátil de ancoragem rápida para deslocamento vertical por cabos."
  },
  "Damaged Leaper Pulse Unit": {
    name: "Unidade de Pulso Leaper Danificada",
    description: "Núcleo de locomoção quebrado de drones saltadores Leaper da ARC."
  },
  "Damaged Rocketeer Driver": {
    name: "Propulsor Rocketeer Danificado",
    description: "Módulo propulsor queimado de unidades voadoras da ARC."
  },
  "Bastion Cell": {
    name: "Célula Bastion",
    description: "Bateria protetora de alta indução obtida de robôs blindados ARC."
  },
  "Bombardier Cell": {
    name: "Célula Bombardier",
    description: "Fonte de ignição química estável colhida de unidades de artilharia da ARC."
  },
  "Leaper Pulse Unit": {
    name: "Unidade de Pulso Leaper",
    description: "Núcleo de pulso intacto de drones Leaper. Usado em tecnologia magnética."
  },
  "Pulse Mine Blueprint": {
    name: "Projeto de Mina de Pulso",
    description: "Esquema completo para manufaturar minas eletromagnéticas."
  },
  "Soap": {
    name: "Sabonete",
    description: "Item de higiene civil precioso na colônia. Mantém a sanidade scrap."
  },
  "Bleach": {
    name: "Alvejante",
    description: "Desinfetante químico concentrado em garrafa plástica."
  },
  "Rattler II": {
    name: "Rattler II",
    description: "Versão calibrada de Tier II da confiável pistola semiautomática."
  },
  "Rubber Pad": {
    name: "Placa de Borracha",
    description: "Borracha vulcanizada espessa de maquinários civis arruinados."
  },
  "Ruined Accordion": {
    name: "Acordeão Arruinado",
    description: "Instrumento musical destruído. Contém molas e partes de borracha."
  },
  "ARC Flex Rubber": {
    name: "Borracha Flexível ARC",
    description: "Composto sintético isolante elétrico de alta flexibilidade."
  },
  "Diving Goggles": {
    name: "Óculos de Mergulho",
    description: "Equipamento plástico protetor de olhos, antigo mas utilizável."
  },
  "Degraded ARC Rubber": {
    name: "Borracha ARC Degradada",
    description: "Borracha danificada por eletrocussão de restos robóticos."
  },
  "Deflated Football": {
    name: "Bola de Futebol Murcha",
    description: "Couro sintético flexível clássico para fabricação de tecidos."
  },
  "Expired Respirator": {
    name: "Respirador Expirado",
    description: "Máscara de gás civil antiga. Útil para partes plásticas e tecidos."
  },
  "Headphones": {
    name: "Fones de Ouvido",
    description: "Dispositivo de áudio antigo. Útil para extrair fios e borracha."
  },
  "Thermostat": {
    name: "Termostato",
    description: "Componente regulador de temperatura civil com circuitos simples."
  },
  "Ruined Riot Shield": {
    name: "Escudo Antimotim Arruinado",
    description: "Grande placa de polímero balístico quebrada, ótima para partes plásticas."
  },
  "Toaster": {
    name: "Torradeira",
    description: "Eletrodoméstico de cozinha arruinado. Cheio de fios e chapas de metal."
  },
  "ARC Synthetic Resin": {
    name: "Resina Sintética ARC",
    description: "Polímero líquido endurecido colhido de blindagens leves robóticas."
  },
  "Cooling Fan": {
    name: "Ventoinha de Resfriamento",
    description: "Ventoinha de plástico de computadores antigos, boa para fios e plástico."
  },
  "Recorder": {
    name: "Gravador",
    description: "Dispositivo de áudio portátil quebrado para saque de circuitos plásticos."
  },
  "Shaker": {
    name: "Coqueteleira",
    description: "Recipiente de metal/plástico de bar civil arruinado."
  },
  "Dried-Out ARC Resin": {
    name: "Resina ARC Ressecada",
    description: "Composto químico solidificado arruinado de alta reciclagem plástica."
  },
  "Camera Lens": {
    name: "Lente de Câmera",
    description: "Lente óptica de vidro e polímero de precis."
  },
  "Remote Control": {
    name: "Controle Remoto",
    description: "Dispositivo infravermelho civil simples. Fonte ágil de circuitos e plástico."
  },
  "Alarm Clock": {
    name: "Despertador",
    description: "Relógio mecânico antigo, cheio de engrenagens de latão e molas."
  },
  "Microscope": {
    name: "Microscópio",
    description: "Equipamento de laboratório óptico raro. Contém componentes elétricos de alta qualidade."
  },
  "Industrial Magnet": {
    name: "Ímã Industrial",
    description: "Bloco magnético robusto e pesado de alta indução ferromagnética."
  },
  "Ripped Safety Vest": {
    name: "Colete Refletivo Rasgado",
    description: "Colete de sinalização rasgado, ótimo para extrair tecidos sintéticos."
  },
  "Ruined Tactical Vest": {
    name: "Colete Tático Arruinado",
    description: "Placa balística vazia danificada com tiras de tecido militar forte."
  },
  "Rattler IV": {
    name: "Rattler IV",
    description: "Pistola Rattler de Tier IV com máxima calibração de combate."
  },
  "Il Toro IV": {
    name: "Il Toro IV",
    description: "Sniper pesada Il Toro modificada para o nível extremo de Tier IV."
  },
  "Unusable Weapon": {
    name: "Arma Inutilizável",
    description: "Pedaço de rifle enferrujado destruído, bom apenas para reciclagem de peças."
  },
  "Trigger \"": {
    name: "Gatilho de Impacto",
    description: "Mecanismo detonador tático para minas e granadas de gatilho."
  },
  "Trigger 'Nade": {
    name: "Granada de Gatilho",
    description: "Granada leve de ativação manual imediata sob sinal de rádio."
  },
  "Cooling Coil": {
    name: "Bobina de Resfriamento",
    description: "Tubo espiral de cobre para resfriamento de líquidos térmicos."
  },
  "Spring Cushion": {
    name: "Almofada de Molas",
    description: "Molas helicoidais de aço estofadas em tecido."
  },
  "Portable TV": {
    name: "TV Portátil",
    description: "Televisor antigo civil. Excelente fonte de fiação e circuitos eletrônicos."
  },
  "Acoustic Guitar": {
    name: "Violão Acústico",
    description: "Violão arruinado. As cordas de aço fornecem fios flexíveis."
  },
  "Power Cable": {
    name: "Cabo de Força",
    description: "Cabo de alimentação elétrico industrial grosso de cobre encapado."
  },
  "Damaged Heat Sink": {
    name: "Dissipador de Calor Danificado",
    description: "Placa aletada de alumínio para resfriamento passivo."
  },
  "Power Bank": {
    name: "Carregador Portátil",
    description: "Bateria recarregável civil de alta capacidade."
  },
  "Humidifier": {
    name: "Umidificador",
    description: "Aparelho de tratamento de ar civil. Fonte de fiação e plásticos."
  },
  "Broken Handheld Radio": {
    name: "Rádio de Mão Quebrado",
    description: "Walkie-talkie arruinado com fiação e circuitos simples."
  },
  "Broken Taser": {
    name: "Taser Quebrado",
    description: "Dispositivo de choque quebrado. Contém eletrodos de cobre e capacitores."
  },
  "Frequency Modulation Box": {
    name: "Caixa de Modulação de Frequência",
    description: "Módulo eletrônico de rádio militar."
  },
  "Photoelectric Cloak": {
    name: "Manto Fotoelétrico",
    description: "Módulo tático avançado que concede invisibilidade térmica contra robôs."
  },
  "Bobcat IV": {
    name: "Bobcat IV",
    description: "Rifle Bobcat calibrado de Tier IV de elite."
  },
  "Tempest IV": {
    name: "Tempest IV",
    description: "Submetralhadora Tempest refinada ao nível máximo de combate."
  },
  "Bobcat III": {
    name: "Bobcat III",
    description: "Rifle Bobcat avançado de Tier III."
  },
  "Hullcracker IV": {
    name: "Hullcracker IV",
    description: "Escopeta Hullcracker de cano duplo robusta de Tier IV."
  },
  "Tempest III": {
    name: "Tempest III",
    description: "Submetralhadora Tempest ágil de Tier III."
  },
  "Vulcano IV": {
    name: "Vulcano IV",
    description: "Metralhadora Vulcano de Tier IV para poder de fogo implacável."
  },
  "Bettina IV": {
    name: "Bettina IV",
    description: "Lança-granadas Bettina de elite calibrado para o Tier IV."
  },
  "Bobcat II": {
    name: "Bobcat II",
    description: "Rifle Bobcat balanceado de Tier II."
  },
  "Hullcracker III": {
    name: "Hullcracker III",
    description: "Escopeta Hullcracker robusta de Tier III."
  },
  "Osprey IV": {
    name: "Osprey IV",
    description: "Rifle Osprey de elite modificado para o Tier IV."
  },
  "Fried Motherboard": {
    name: "Placa-Mãe Queimada",
    description: "Placa de circuito arruinada cheia de transistores de silício."
  },
  "Rotary Encoder": {
    name: "Codificador Rotativo",
    description: "Sensor eletrônico de medição de rotações mecânicas."
  },
  "Sample Cleaner": {
    name: "Purificador de Amostras",
    description: "Dispositivo elétrico de purificação celular com microbombas."
  },
  "Signal Amplifier": {
    name: "Amplificador de Sinal",
    description: "Amplifica frequências de ondas de rádio em circuitos de longo alcance."
  },
  "Snitch Scanner": {
    name: "Scanner Snitch",
    description: "Módulo de radar óptico retirado de drones espiões Snitch da ARC."
  },
  "Spotter Relay": {
    name: "Relé de Reconhecimento",
    description: "Receptor de telemetria eletrônica de unidades espias ARC."
  },
  "Vulcano III": {
    name: "Vulcano III",
    description: "Metralhadora Vulcano pesada de Tier III."
  },
  "Bettina III": {
    name: "Bettina III",
    description: "Lança-granadas Bettina avançado de Tier III."
  },
  "Hullcracker II": {
    name: "Hullcracker II",
    description: "Escopeta Hullcracker tática de Tier II."
  },
  "Vulcano II": {
    name: "Vulcano II",
    description: "Metralhadora Vulcano robusta de Tier II."
  },
  "Bettina II": {
    name: "Bettina II",
    description: "Lança-granadas Bettina balanceado de Tier II."
  },
  "Bettina I": {
    name: "Bettina I",
    description: "Lança-granadas Bettina tático básico de Tier I."
  },
  "Bobcat I": {
    name: "Bobcat I",
    description: "Rifle Bobcat tático padrão de Tier I."
  },
  "Arpeggio III": {
    name: "Arpeggio III",
    description: "Pistola de rajada Arpeggio calibrada para Tier III."
  },
  "Burletta IV": {
    name: "Burletta IV",
    description: "Escopeta automática Burletta de elite de Tier IV."
  },
  "Power Drill": {
    name: "Furadeira Elétrica",
    description: "Ferramenta de perfuração industrial pesada."
  },
  "Osprey III": {
    name: "Osprey III",
    description: "Rifle de rajada Osprey de Tier III."
  },
  "Renegade III": {
    name: "Renegade III",
    description: "Rifle de precisão Renegade tático de Tier III."
  },
  "Renegade IV": {
    name: "Renegade IV",
    description: "Rifle Renegade modificado para o Tier IV militar de elite."
  },
  "Tempest II": {
    name: "Tempest II",
    description: "Submetralhadora Tempest calibrada para Tier II."
  },
  "Torrente III": {
    name: "Torrente III",
    description: "Metralhadora rotativa Torrente de Tier III."
  },
  "Torrente IV": {
    name: "Torrente IV",
    description: "Metralhadora rotativa Torrente calibrada ao nível máximo de Tier IV."
  },
  "Venator III": {
    name: "Venator III",
    description: "Rifle eletromagnético Venator tático de Tier III."
  },
  "Anvil IV": {
    name: "Anvil IV",
    description: "Rifle de assalto Anvil de Tier IV com máxima calibração de poder."
  },
  "Arpeggio IV": {
    name: "Arpeggio IV",
    description: "Pistola Arpeggio modificada para o nível extremo de Tier IV."
  },
  "Anvil III": {
    name: "Anvil III",
    description: "Rifle de assalto Anvil tático robusto de Tier III."
  },
  "Il Toro III": {
    name: "Il Toro III",
    description: "Sniper de precisão Il Toro de Tier III de alta potência."
  },
  "Anvil II": {
    name: "Anvil II",
    description: "Rifle de assalto Anvil calibrado de Tier II."
  },
  "Jupiter (Tier 1)": {
    name: "Jupiter (Tier 1)",
    description: "Fuzil de assalto pesado Jupiter básico de Tier I."
  },
  "Aphelion (Tier 1)": {
    name: "Aphelion (Tier 1)",
    description: "Rifle eletromagnético Aphelion básico de Tier I."
  },
  "Sentinel Weaponry Core": {
    name: "Núcleo de Armamento Sentinel",
    description: "Processador de combate militar exótico retirado de unidades Sentinel da ARC."
  },
  "Launcher Ammo": {
    name: "Munição de Lançador",
    description: "Granadas propelidas a foguete projetadas para lança-granadas."
  },
  "Magnetron": {
    name: "Magnetron",
    description: "Emissor de microondas eletromagnéticas térmicas de alta frequência."
  },
  "Industrial Charger": {
    name: "Carregador Industrial",
    description: "Gerador de recarga elétrica pesada de grande voltagem."
  },
  "Ion Sputter": {
    name: "Dispersor de Íons",
    description: "Gerador eletrostático exótico extraído de robôs pesados ARC."
  },
  "Fire Extinguisher": {
    name: "Extintor de Incêndio",
    description: "Recipiente pressurizado com gás CO2."
  },
  "Compressed Air Can": {
    name: "Lata de Ar Comprimido",
    description: "Lata plástica com gás pressurizado civil de limpeza."
  },
  "ARC Tick": {
    name: "ARC Tick",
    description: "Unidade robótica menor ágil da ARC que pula nos Raiders para detonar."
  },
  "ARC Tick Nymph": {
    name: "Ninfa ARC Tick",
    description: "Versão minúscula e instável dos drones Tick da ARC."
  },
  "Scavenging (Outdoors / Nature zones)": {
    name: "Coleta (Áreas Externas / Zonas Naturais)",
    description: "Recursos naturais coletados na floresta e ruínas externas."
  },
  "Scavenging (Rocks / Damp surfaces)": {
    name: "Coleta (Rochas / Superfícies Úmidas)",
    description: "Materiais orgânicos obtidos de encostas úmidas e cavernas."
  },
  "Medical Supply Box": {
    name: "Caixa de Suprimentos Médicos",
    description: "Contêiner selado civil cheio de kits médicos e químicos."
  },
  "First Aid Kit": {
    name: "Kit de Primeiros Socorros",
    description: "Estojo de resgate médico com bandagens, antissépticos e Vita Shots."
  },
  "Scavenging (Medical zones)": {
    name: "Coleta (Zonas Médicas)",
    description: "Purificação de recursos obtida em hospitais e clínicas arruinadas."
  },
  "Launcher Ammo (Incendiary)": {
    name: "Munição de Lançador (Incendiária)",
    description: "Projéteis de lançador preenchidos com Napalm sintético."
  },
  "ARC Rocketeer": {
    name: "ARC Rocketeer",
    description: "Robô de ataque aéreo móvel da ARC equipado com lança-mísseis táticos."
  },
  "ARC Bastion": {
    name: "ARC Bastion",
    description: "Robô terrestre pesado ARC projetado com gerador de escudos massivos."
  },
  "ARC Tank": {
    name: "ARC Tank",
    description: "Blindado de combate quadrúpede colossal da ARC com armamentos pesados."
  },
  "Motor": {
    name: "Motor",
    description: "Motor de indução mecânico de alto empuxo de veículos civis arruinados."
  },
  "Water Pump": {
    name: "Bomba d'Água",
    description: "Componente hidráulico civil contendo rotor e carcaça metálica."
  },
  "Turbo Pump": {
    name: "Turbobomba",
    description: "Bomba centrífuga de alta pressão para fluxo contínuo de combustível químico."
  },
  "Coolant": {
    name: "Líquido de Resfriamento",
    description: "Fluido sintético refrigerante térmico concentrado."
  },
  "Polluted Air Filter": {
    name: "Filtro de Ar Poluído",
    description: "Filtro industrial entupido de fibras sintéticas."
  },
  "Snap Hook": {
    name: "Mosquetão Tático",
    description: "Mosquetão de liga reforçada com rolamento motorizado para cabos táticos."
  },
  "Scavenging (Residential / Commercial zones)": {
    name: "Coleta (Zonas Residenciais / Comerciais)",
    description: "Saque de componentes civis limpos de lojas e casas destruídas."
  },
  "ARC Snitch": {
    name: "ARC Snitch",
    description: "Drone espião voador ágil que varre a área para chamar reforços ARC."
  },
  "ARC Surveyor": {
    name: "ARC Surveyor",
    description: "Drone de mapeamento geográfico que vigia ruínas da colônia."
  },
  "ARC Android": {
    name: "ARC Android",
    description: "Soldado humanoide padrão de combate e patrulha militar da ARC."
  },
  "Server Rack": {
    name: "Gabinete de Servidor",
    description: "Estrutura de informática cheia de processadores e placas eletrônicas."
  },
  "Radio": {
    name: "Rádio",
    description: "Aparelho de som civil antigo com bobinas metálicas e fiação de cobre."
  },
  "Noisemaker": {
    name: "Emissor de Ruídos",
    description: "Dispositivo que emite ondas acústicas irritantes para desorientar robôs."
  },
  "ARC Hornet": {
    name: "ARC Hornet",
    description: "Microdrone voador de patrulha ágil equipado com metralhadoras térmicas."
  },
  "ARC Courier": {
    name: "ARC Courier",
    description: "Unidade robótica de transporte rápido da ARC carregando cargas valiosas."
  },
  "ARC Matriarch (Boss drop)": {
    name: "ARC Matriarch (Chefe)",
    description: "Máquina de comando titânica da ARC de alto extermínio militar."
  },
  "ARC Queen (Boss drop)": {
    name: "ARC Queen (Chefe)",
    description: "A ameaça máxima robótica aérea da ARC com reator termonuclear colossal."
  },
  "ARC Queen Leg Armor": {
    name: "Armadura da Perna da Rainha ARC",
    description: "Placa balística indestrutível obtida do chassi da colossal ARC Queen."
  }
};

// Merge them
const merged = { ...existingTranslations };
for (const [key, value] of Object.entries(newTranslations)) {
  if (!merged[key]) {
    merged[key] = value;
  } else {
    // If it's already there, let's make sure it has perks if newTranslations has perks
    if (value.perks && !merged[key].perks) {
      merged[key].perks = value.perks;
    }
  }
}

// Generate formatting for components/translationDictionary.ts
let outputText = 'export const translations: Record<string, Record<string, string>> = {\n';

// We can read the existing translations from components/translationDictionary.ts up to line 478
const dictPath = 'components/translationDictionary.ts';
const origContent = fs.readFileSync(dictPath, 'utf8');

const itemTranslationsStartIdx = origContent.indexOf('export const itemTranslations');
if (itemTranslationsStartIdx === -1) {
  console.error('Could not find itemTranslations start');
  process.exit(1);
}

const headerPart = origContent.substring(0, itemTranslationsStartIdx);

let newDictContent = 'export const itemTranslations: Record<string, { name: string; description: string; perks?: string }> = {\n';

// We want to sort the keys or print them in groupings
// Let's write them cleanly formatted
for (const [key, val] of Object.entries(merged)) {
  newDictContent += `  ${JSON.stringify(key)}: {\n`;
  newDictContent += `    name: ${JSON.stringify(val.name)},\n`;
  newDictContent += `    description: ${JSON.stringify(val.description)}`;
  if (val.perks) {
    newDictContent += `,\n    perks: ${JSON.stringify(val.perks)}`;
  }
  newDictContent += `\n  },\n`;
}

// Strip last comma and close
newDictContent = newDictContent.substring(0, newDictContent.length - 2) + '\n};\n';

fs.writeFileSync(dictPath, headerPart + newDictContent);
console.log('Injected translations into components/translationDictionary.ts successfully!');
