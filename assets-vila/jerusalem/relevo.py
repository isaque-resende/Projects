# Jerusalém e arredores: o relevo e os lugares, num sistema só (o "mundo").
#
# O mundo usa as coordenadas do Getsêmani (o jogo: x leste, y altura; o NORTE é -z: no three.js, com x para leste e
# y para cima, o +z aponta para o sul). No Blender: (x, -z, y), então lá o norte é +y, como num mapa.
# A Rocha da Agonia fica em (-27, -8).
#
# As distâncias reais, medidas a partir da Basílica da Agonia, entram reduzidas: a cidade fica a ~0,3 da distância de
# verdade e os prédios a ~0,3 do tamanho (as fases são compactas, como Betânia e Betfagé). O jardim e o vale do
# Cedrom têm escala própria (o leito fica a 35 m da rocha, e não a 21): é ali que se anda.
#
#   lugar                         real (m, a partir da rocha)      mundo (x, z)
#   leito do Cedrom                ~70 a oeste                      x = -62,5
#   muro leste do templo           ~270 a oeste                     x = -107
#   quina nordeste do templo       ~270 O, ~60 N                    (-107, -26)
#   Porta Dourada (Susã)           ~265 O, ~100 S                   (-107, +35), alinhada com o santuário
#   santuário (Domo da Rocha)      ~420 O, ~150 S                   (-153, +35), de frente para o leste
#   quina sudeste (pináculo)       ~270 O, ~390 S                   (-107, +109)
#   Fortaleza Antônia              ~610 O, ~120 N (canto noroeste)  (-190, -32)
#   Porta das Ovelhas              no muro norte, abrindo p/ norte  (-134, -39)
#   Tanque de Betesda              ~420 O, ~200 N                   (-154, -55)
#   cume do Monte das Oliveiras    ~480 L, ~80 S                    (117, +16)
#
# Leitura do mapa de referência ("Jerusalém na época de Jesus"): o Getsêmani fica em frente ao canto norte do muro
# leste; a estrada que sai dele cruza o Cedrom na diagonal (noroeste) e chega à quina nordeste, entre o templo e o
# Tanque de Israel; Betesda fica ao norte do templo, do lado de fora do muro da cidade daquela época. A Porta das
# Ovelhas fica junto do tanque (Jo 5.2): no muro norte, abrindo para o norte, para Betesda; quem entra por ela chega
# ao lado norte do templo (Ne 3.1, 3.32). Olhando do jardim para oeste, o templo fica à esquerda (sul) e Betesda, a
# Porta das Ovelhas e a Antônia, à direita (norte).
#
# A maquete é desenhada no "plano velho" (o primeiro rascunho: metade da distância real, norte = +z) e levada para o
# mundo por PARA_MUNDO: espelha o norte e reduz a 0,6 em volta da rocha. Por isso há dois relevos: h_velho (onde os
# prédios foram desenhados) e h_mundo (o chão de verdade, onde se anda); a cidade de um é 0,6 x a do outro.
import math


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


LEITO = -62.5                         # o leito do Cedrom (corre de norte a sul), igual nos dois planos
ROCHA = (-27.0, -8.0)
K = 0.6                               # do plano velho para o mundo

# ---------------- o plano velho (onde a maquete é desenhada) ----------------
TX0, TX1, TZ0, TZ1, TY = -311.0, -161.0, -203.0, 22.0, 26.0     # o monte do templo (topo da esplanada em TY)
SANTUARIO = (-237.0, -80.0)
SUSA_Z = -80.0
NORTE_Z = 40.0                        # o muro norte (face de fora em z = 43)
PORTA_OVELHAS = (-205.0, 43.0)
BETESDA = (-238.0, 71.0)
ANTONIA = (-332.0, -292.0, 18.0, 46.0)


def pe_velho(z):
    """O chão no pé dos muros: baixo ao longo do templo, alto ao norte dele (o planalto de Betesda), e descendo para o
    sul (a Cidade de Davi)."""
    return 8.0 + 14.0 * sm(15, 45, z) - 0.07 * max(0.0, -203.0 - z)


def cidade_velho(x, z):
    return pe_velho(z) + 0.02 * min(-158 - x, 300) + 0.06 * min(max(0.0, -330 - x), 150) * sm(60, 0, z)


def h_velho(x, z):
    """Só para assentar os prédios da maquete (a oeste do Cedrom)."""
    if x < -158: return cidade_velho(x, z)
    fundo = -13.0 + 0.02 * z
    return fundo + (pe_velho(z) - fundo) * sm(LEITO - 3, -158, x)


def para_mundo(x, z):
    return ROCHA[0] + K * (x - ROCHA[0]), ROCHA[1] - K * (z - ROCHA[1])


def do_mundo(x, z):
    return ROCHA[0] + (x - ROCHA[0]) / K, ROCHA[1] - (z - ROCHA[1]) / K


XW = para_mundo(-158.0, 0.0)[0]       # o pé dos muros, no mundo (~ -105,6)

# ---------------- o mundo ----------------
# a Oliveiras é outra fase: as coordenadas dela = mundo + OLIVEIRAS (o cume de lá fica no cume real, em (117, 16))
OLIVEIRAS = (-100.0, -12.0, -16.3)


def h_mundo(x, z):
    h = 0.075 * x + 0.03 * z
    if x > 80: h += 0.12 * min(x - 80, 220)                 # a encosta do Monte das Oliveiras, mais forte para o leste
    if x < -40:                                             # o vale do Cedrom e a outra encosta
        fundo = -13.0 - 0.02 * z                            # o leito desce para o sul (+z)
        if x > LEITO: h = h + (fundo - h) * sm(-40, -59.5, x)
        else:
            xv, zv = do_mundo(x, z)
            if x > XW: h = fundo + (K * pe_velho(zv) - fundo) * sm(LEITO - 3, XW, x)
            else: h = K * cidade_velho(xv, zv)
        h -= 0.9 * (1 - sm(0, 2.4, abs(x - LEITO)))          # o canal do ribeiro (seco nesta época)
    d = math.hypot(x + 70, z)                               # bem longe, o chão desce e some atrás do horizonte
    if d > 520: h -= 0.12 * (d - 520)
    h += 0.22 * math.sin(x * 0.29 + 1.0) * math.cos(z * 0.31 - 0.6) + 0.08 * math.sin(x * 0.83 + z * 0.61)
    return h
