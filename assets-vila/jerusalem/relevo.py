# Jerusalém e arredores: o relevo e os lugares, num sistema só (o "mundo").
#
# O mundo usa as coordenadas do Getsêmani (o jogo: x leste, y altura, z norte; no Blender (x, -z, y)), com a Rocha da
# Agonia em (-27, -8). As distâncias reais foram medidas a partir da Basílica da Agonia e reduzidas à METADE na
# horizontal; as alturas, a ~0,4 (o vale continua fundo, mas dá para subir andando):
#
#   lugar                         real (m, a partir da rocha)      mundo (x, z)
#   leito do Cedrom                ~70 a oeste                      x = -62,5
#   muro leste do templo           ~270 a oeste                     x = -161
#   quina nordeste do templo       ~270 O, ~60 N                    (-161, 22)
#   Porta Dourada (Susã)           ~265 O, ~100 S                   (-161, -80), alinhada com o santuário
#   santuário (Domo da Rocha)      ~420 O, ~150 S                   (-237, -80), de frente para o leste
#   quina sudeste (pináculo)       ~270 O, ~390 S                   (-161, -203)
#   muro oeste do templo           ~570 O                           x = -311
#   Fortaleza Antônia              ~610 O, ~120 N (canto noroeste)  (-312, 32)
#   Tanque de Betesda              ~420 O, ~200 N                   (-238, 71)
#   cume do Monte das Oliveiras    ~480 L, ~80 S                    (213, -48)
#
# Leitura do mapa de referência ("Jerusalém na época de Jesus"): o Getsêmani fica em frente ao canto norte do muro
# leste; a estrada que sai dele cruza o Cedrom na diagonal (noroeste) e chega à quina nordeste, entre o templo e o
# Tanque de Israel; Betesda fica ao norte do templo, do lado de fora do muro da cidade daquela época. A Porta das
# Ovelhas fica junto do tanque (Jo 5.2): no muro norte, abrindo para o norte, para Betesda; quem entra por ela chega
# ao lado norte do templo (Ne 3.1, 3.32).
import math


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


LEITO = -62.5                         # o leito do Cedrom (corre de norte a sul)
TX0, TX1, TZ0, TZ1, TY = -311.0, -161.0, -203.0, 22.0, 26.0     # o monte do templo (topo da esplanada em TY)
SANTUARIO = (-237.0, -80.0)
SUSA_Z = -80.0
NORTE_Z = 40.0                        # o muro norte (face de fora em z = 43)
PORTA_OVELHAS = (-205.0, 43.0)
BETESDA = (-238.0, 71.0)
ANTONIA = (-332.0, -292.0, 18.0, 46.0)
ROCHA = (-27.0, -8.0)
# o Monte das Oliveiras é outra fase: as coordenadas dele = mundo + OLIVEIRAS (o cume de lá fica no cume real)
OLIVEIRAS = (-196.0, -30.0, 47.7)


def pe_muro(z):
    """A altura do chão do lado de lá do Cedrom, no pé dos muros: baixo ao longo do templo, alto ao norte dele
    (o planalto de Betesda), e descendo para o sul (a Cidade de Davi)."""
    return 8.0 + 14.0 * sm(15, 45, z) - 0.07 * max(0.0, -203.0 - z)


def h_mundo(x, z):
    h = 0.075 * x + 0.03 * z
    if x > 80: h += 0.12 * min(x - 80, 220)                 # a encosta do Monte das Oliveiras, mais forte para o leste
    if x < -40:                                             # o vale do Cedrom e a outra encosta
        fundo = -13.0 + 0.02 * z
        if x > LEITO: h = h + (fundo - h) * sm(-40, -59.5, x)
        else:
            pe = pe_muro(z)
            h = fundo + (pe - fundo) * sm(LEITO - 3, -158, x)
            if x < -158:                                    # a cidade: sobe devagar para oeste (a cidade alta)
                h += 0.02 * min(-158 - x, 300) + 0.06 * min(max(0.0, -330 - x), 150) * sm(60, 0, z)
        h -= 0.9 * (1 - sm(0, 2.4, abs(x - LEITO)))          # o canal do ribeiro (seco nesta época)
    d = math.hypot(x + 100, z)                              # bem longe, o chão desce e some atrás do horizonte
    if d > 650: h -= 0.12 * (d - 650)
    h += 0.22 * math.sin(x * 0.29 + 1.0) * math.cos(z * 0.31 - 0.6) + 0.08 * math.sin(x * 0.83 + z * 0.61)
    return h
