# Jerusalém e arredores: o relevo e os lugares, num sistema só (o "mundo").
#
# O mundo usa as coordenadas do Getsêmani (o jogo: x leste, y altura; o NORTE é -z: no three.js, com x para leste e
# y para cima, o +z aponta para o sul). No Blender: (x, -z, y), então lá o norte é +y, como num mapa.
# A Rocha da Agonia fica em (-27, -8).
#
# As distâncias reais, medidas a partir da Basílica da Agonia, entram reduzidas, em escala de RPG (como Betânia e
# Betfagé): a cidade fica a ~0,18 da distância de verdade, e o templo a ~0,18 do tamanho; as alturas, a ~0,48. O que
# se vê de perto (casas, bancas, portas, o Gólgota, o horto) é desenhado em metros do jogo (MH, MV). O jardim e o vale
# do Cedrom têm escala própria (o leito fica a 35 m da rocha): é ali que se anda.
#
#   lugar                         real (m, a partir da rocha)      mundo (x, z)
#   leito do Cedrom                ~70 a oeste                      x = -62,5
#   muro leste do templo           ~270 a oeste                     x = -107
#   quina nordeste do templo       ~270 O, ~60 N                    (-107, -26)
#   Porta Dourada (Susã)           ~265 O, ~100 S                   (-106, +8), alinhada com o santuário
#   santuário (Domo da Rocha)      ~420 O, ~150 S                   (-132, +8), de frente para o leste
#   quina sudeste (pináculo)       ~270 O, ~390 S                   (-107, +48)
#   Fortaleza Antônia              ~610 O, ~120 N (canto noroeste)  (-157, -29)
#   Porta das Ovelhas              no muro norte, abrindo p/ norte  (-122, -34)
#   Tanque de Betesda              ~420 O, ~200 N                   (-133, -42)
#   cume do Monte das Oliveiras    ~480 L, ~80 S                    (117, +16)
#   Gólgota (Santo Sepulcro)       ~940 O, ~110 S                   (-223, +2); o horto e o sepulcro logo a oeste
#   Porta de Genat (a saída)       no primeiro muro, abrindo p/ norte (-216, +31); a estrada de Emaús vai p/ noroeste
#   mercado (Pátio dos Gentios)    junto à Estoa Real                (-134, +39)
#   Tanque de Siloé                ~475 O, ~980 S                   (-148, +140)
#   palácio de Herodes             ~1120 O, ~540 S                  (-245, +62)
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


def dist_seg(px, pz, a, b):
    (xa, za), (xb, zb) = a, b; dx, dz = xb - xa, zb - za; L2 = dx * dx + dz * dz or 1e-9
    t = max(0.0, min(1.0, ((px - xa) * dx + (pz - za) * dz) / L2))
    return math.hypot(px - xa - dx * t, pz - za - dz * t)


def dist_poli(px, pz, pts): return min(dist_seg(px, pz, a, b) for a, b in zip(pts, pts[1:]))


def tiro_x(z):
    """O fundo do vale do Tiropeon: corre junto ao muro oeste do templo e, ao sul, faz a curva para o Tanque de Siloé."""
    return -320.0 + 35.0 * sm(-150, -490, z)


# o vale de Hinom: contorna a cidade alta pelo oeste e pelo sul e encontra o Cedrom abaixo de Siloé
HINOM = [(-645.0, -120.0), (-648.0, -380.0), (-605.0, -535.0), (-450.0, -550.0), (-300.0, -538.0), (-215.0, -528.0)]


def cidade_velho(x, z):
    h = pe_velho(z) + 0.02 * min(-158 - x, 300)
    h += (16.0 * sm(-328, -390, x) + 0.04 * min(max(0.0, -390 - x), 200)) * sm(70, 0, z)   # a colina oeste (a cidade alta)
    h -= 7.5 * math.exp(-((x - tiro_x(z)) / 18.0) ** 2) * sm(90, 30, z)                    # o Tiropeon (a cidade baixa)
    if x < -165: h -= 10.0 * math.exp(-(dist_poli(x, z, HINOM) / 22.0) ** 2) * sm(-165, -215, x)   # o Hinom
    return h


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

# A escala de RPG: a cidade (as distâncias, o templo, as alturas) é encolhida em volta da quina nordeste do templo, que
# fica onde estava (é ela que o Getsêmani vê). Para leste da quina (o muro leste e a encosta do Cedrom) só o norte-sul
# encolhe. O que se vê de perto (casas, bancas, bichos, portas, o Gólgota, o horto) é desenhado em metros do jogo:
# no plano velho, MH = 1 m na horizontal e MV = 1 m na vertical.
S_CID = 0.55                          # as distâncias e os tamanhos da cidade
SY = 0.8                              # as alturas
ANC = (-161.0, 22.0)                  # a quina nordeste do templo, no plano velho
KY = K * SY
MH, MV = 1 / (K * S_CID), 1 / KY


def encolhe(x, z):
    return (ANC[0] + S_CID * (x - ANC[0]) if x < ANC[0] else x), ANC[1] + S_CID * (z - ANC[1])


def estica(x, z):
    return (ANC[0] + (x - ANC[0]) / S_CID if x < ANC[0] else x), ANC[1] + (z - ANC[1]) / S_CID

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
            xv, zv = estica(*do_mundo(x, z))
            if x > XW: h = fundo + (KY * pe_velho(zv) - fundo) * sm(LEITO - 3, XW, x)
            else: h = KY * cidade_velho(xv, zv)
        h -= 0.9 * (1 - sm(0, 2.4, abs(x - LEITO)))          # o canal do ribeiro (seco nesta época)
    d = math.hypot(x + 70, z)                               # bem longe, o chão desce e some atrás do horizonte
    if d > 520: h -= 0.12 * (d - 520)
    h += 0.22 * math.sin(x * 0.29 + 1.0) * math.cos(z * 0.31 - 0.6) + 0.08 * math.sin(x * 0.83 + z * 0.61)
    return h
