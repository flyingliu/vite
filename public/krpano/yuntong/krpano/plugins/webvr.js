var krpanoplugin = function() {
    function Ii(e) {
        return ".yes.on.true.1" [p](("." + e)[h]()) >= 0
    }

    function qi(e) {}

    function Ri() {
        Ci = 0;
        if (Dr[hn] || Vr)
            if (Dr[A]) {
                var e = ("" + navigator[mt])[h]()[p]("ucbrowser") > 0;
                Dr.chrome || Dr[rt] ? Ci = 2 : e && (Ci = 2)
            } else Ci = 2;
        if (Ci > 0) {
            ai == 0 && (Ci = 1);
            if (Dr[w] && Vr) setTimeout(zi, 10);
            else {
                window[o](Ci == 1 ? v : C, Wi, t);
                var r = Pr[l] != "" && Pr[l] != s;
                setTimeout(zi, Dr[w] ? 10 : r ? 1500 : 3e3)
            }
        } else Si == t && (Si = n, bb[tt](Pr[l], Pr))
    }

    function Ui() {
        Si == t && (Si = n, mi = n, gi = n, yi = n, bi = t, cs(), bb[tt](Pr[I], Pr))
    }

    function zi() {
        window[r](v, Wi, t), window[r](C, Wi, t), Dr[w] && Vr ? Ui() : Si == t && (Si = n, bb[tt](Pr[l], Pr))
    }

    function Wi(e) {
        window[r](e.type, Wi, t), e.type == v || e.type == C && e[Ft] && e.rotationRate ? (Si = n, mi = n, gi = n, Dr[w] && (yi = n), cs(), bb[tt](Pr[I], Pr)) : Dr[w] && Vr ? Ui() : Si == t && (Si = n, bb[tt](Pr[l], Pr))
    }

    function rs(e) {
        mi = t, e[Kt] > 0 && (bc = e[0], "VRFrameData" in window && (Vi = new VRFrameData), bb.trace(0, "WebVR Display: " + bc.displayName + " (api=" + (Vi ? "1.1" : "1.0") + " connected=" + bc.isConnected + ", presenting=" + bc[$] + ", canpresent=" + bc[V].canPresent + " externaldisplay=" + bc[V][Hn] + ")"), mi = n, bc && bc[V] && bc[V].canPresent), mi ? (ui == t && Dr[A] && (bi = n), window[o]("vrdisplaypresentchange", is, t), bb[tt](Pr[I], Pr)) : Dr[w] && Vr ? Ui() : Si == t && (Si = n, bb[tt](Pr[l], Pr))
    }

    function is(e) {
        bb[H][Q] = n;
        var i = bb[x][kt],
            s = bb[E][q];
        bc[V][Hn] ? bc[$] ? Dr[w] && (Pi && ("onpointerlockchange" in document ? document[o]("pointerlockchange", os, t) : "onmozpointerlockchange" in document && document[o]("mozpointerlockchange", os, t), Hi.apply(s), Bs = 1, i[o](U, js, t)), Rs = 5, s[o](ct, Us, t), document[o](Nr, ss, t)) : (document[r](Nr, ss, t), s[r](ct, Us, t), i[r](U, js, t)) : bc[$] == t && Ns()
    }

    function ss(e) {
        e.keyCode == 27 && Ns()
    }

    function os() {
        var e = bb[E][q];
        document[jn] !== e && document[vn] !== e && Ns()
    }

    function us(e) {
        var r;
        for (r = 0; r < e[Kt]; r++)
            if (e[r] instanceof HMDVRDevice) {
                $i = e[r], $i[y] ? (Ki = $i[y](Bt), Qi = $i[y](G), Yi = Ki[yr], Zi = Qi[yr], es = Ki[un], ts = Qi[un]) : $i[Ot] && $i[j] && (Yi = $i[Ot](Bt), Zi = $i[Ot](G), es = $i[j](Bt), ts = $i[j](G));
                var i = 2 * Math.max(es.leftDegrees, es.rightDegrees),
                    o = 2 * Math.max(es.upDegrees, es.downDegrees);
                ns = Math.max(i, o);
                break
            }
        for (r = 0; r < e[Kt]; r++)
            if (e[r] instanceof PositionSensorVRDevice)
                if ($i == s || $i[mr] == e[r][mr]) {
                    Ji = e[r];
                    break
                }
        $i || Ji ? (mi = n, ui == t && Dr[A] && (bi = n), bb[tt](Pr[I], Pr)) : Dr[w] && Vr ? Ui() : Si == t && (Si = n, bb[tt](Pr[l], Pr))
    }

    function fs(e) {
        vi = e;
        if (e) {
            as = {
                imagehfov: bb.image.hfov,
                continuousupdates: bb[u][L],
                usercontrol: bb[x][qt],
                mousetype: bb[x][cn],
                contextmenu_touch: bb[Mn].touch,
                loadwhilemoving: bb[E][X],
                stereo: bb[E][Pn],
                stereooverlap: bb[E][vt],
                hlookat: bb[u][O],
                vlookat: bb[u][en],
                camroll: bb[u][An],
                fovmin: bb[u][Vt],
                fovmax: bb[u][Xt],
                fisheye: bb[u][ut],
                fov: bb[u].fov,
                maxpixelzoom: bb[u][b],
                fovtype: bb[u][st],
                stereographic: bb[u][k],
                fisheyefovlink: bb[u][S],
                pannini: bb[u][it],
                architectural: bb[u][g],
                limitview: bb[u][_],
                area_mode: bb[H].mode,
                area_align: bb[H].align,
                area_x: bb[H].x,
                area_y: bb[H].y,
                area_width: bb[H][Tt],
                area_height: bb[H][F],
                maxmem: bb.memory[ir]
            }, bb[H].mode = "align", bb[H].align = "lefttop", bb[H].x = "0", bb[H].y = "0", bb[H][Tt] = "100%", bb[H][F] = "100%", bb[H][Q] = n, bb[Mn].touch = t, bb[u][L] = n, yi && Dr[w] && !Pi ? bb[x][cn] = "drag2d" : bb[x][qt] = Gn, bb[E][Pn] = n, bb[E][X] = n, bb[u][_] = Gn, bb[u][it] = 0, bb[u][g] = 0, bb[u][st] = pr, bb[u][Vt] = 0, bb[u][Xt] = 179, bb[u][ut] = 0, bb[u].fov = ns, bb[u][b] = 0, bb[u][k] = n, bb[u][S] = 0, Ai = bb[u][O], qs = 0, Dr[w] || (Ai -= no()), Hs();
            if (gi || bi) ds(0, 0), yi && Dr[w] && !Pi || (bb[gt] = n);
            Ms(), $r && Ps(n), bb.set("events[__webvr].keep", n), bb.set("events[__webvr].onnewpano", _s), bb.set("events[__webvr].onresize", Ds), (gi || bi) && Ma(n), bb[tt](Pr.onentervr, Pr)
        } else {
            Dr[c][m][a] && Hr[r](Dr[c][m][a], Fs);
            if (as) {
                bb.set("events[__webvr].name", s), bb[u][L] = as[L], bb[x][qt] = as[qt], bb[x][cn] = as[cn], bb[Mn].touch = as.contextmenu_touch, bb[E][X] = as[X], bb[E][Pn] = as[Pn], bb[E][vt] = as[vt], bb[u][An] = 0;
                if (as.imagehfov == bb.image.hfov) bb[u][Vt] = as[Vt], bb[u][Xt] = as[Xt], bb[u].fov = as.fov, bb[u][b] = as[b], bb[u][st] = as[st], bb[u][_] = as[_], bb[u][ut] = as[ut], bb[u][k] = as[k], bb[u][S] = as[S], bb[u][it] = as[it], bb[u][g] = as[g];
                else {
                    var i = bb.xml[u];
                    bb[u][Vt] = i && !isNaN(Number(i[Vt])) ? Number(i[Vt]) : 1, bb[u][Xt] = i && !isNaN(Number(i[Xt])) ? Number(i[Xt]) : 140, bb[u].fov = i && !isNaN(Number(i.fov)) ? Number(i.fov) : 90, bb[u][ut] = i && !isNaN(Number(i[ut])) ? Number(i[ut]) : 0, bb[u][it] = i && !isNaN(Number(i[it])) ? Number(i[it]) : 0, bb[u][g] = i && !isNaN(Number(i[g])) ? Number(i[g]) : 0, bb[u][b] = i && !isNaN(Number(i[b])) ? Number(i[b]) : 2, bb[u][st] = i && i[st] ? i[st] : "MFOV", bb[u][_] = i && i[_] ? i[_] : Zt, bb[u][k] = n, bb[u][S] = .5
                }
                bb[H].mode = as.area_mode, bb[H].align = as.area_align, bb[H].x = as.area_x, bb[H].y = as.area_y, bb[H][Tt] = as.area_width, bb[H][F] = as.area_height, bb[H][Q] = n, bb[Mt] = -1, bb[ft] = t, bb.memory[ir] = as[ir], as = s, hi && (bo(hi, t), hi = s), Ma(t), Ps(t), Hs(), bb[tt](Pr.onexitvr, Pr)
            }
        }
    }

    function cs() {
        if (ls) return ls;
        var e = Ar,
            r = 0,
            i = 1536,
            o = Math.min(screen[Tt], screen[F]),
            u = Math.max(screen[Tt], screen[F]),
            a = window.devicePixelRatio || 1,
            f = t;
        if (Dr.iphone)
            if (u == 568) {
                var l = bb[En].context,
                    c = "" + l.getParameter(l.VERSION);
                c[p]("A8 GPU") > 0 ? Dr.ipod ? (e = "iPod 6", r = 4) : (e = wr, r = 4.7) : c[p]("A9 GPU") > 0 ? (e = "iPhone 6S", r = 4.7) : c[p]("SGX") > 0 ? (e = "iPhone 5", r = 4, i = 1024) : c[p]("A7 GPU") > 0 ? (e = "iPhone 5S", r = 4, i = 1024) : (e = "iPhone", r = 4.7)
            } else u == 667 ? a == 2 ? (e = wr, r = 4.7) : (e = sr, r = 5.5) : u == 736 && (e = sr, r = 5.5);
        else if (Dr[hn]) {
            var d = navigator[mt],
                v = s,
                m = d[p]("("),
                g = d[p](")");
            if (m > 0 && g > m) {
                var y = ("" + d[zt](m + 1, g))[tn](";");
                if (y[Kt] > 2) {
                    v = y[y[Kt] - 1].trim();
                    var b = v[h]()[p](" build/");
                    b > 0 && (v = v[zt](0, b)), v = v[tn](" ").join("-")[tn]("_").join("-")[tn]("/").join("-"), v[zt](0, 3)[h]() == "rv:" && (v = s)
                }
            }
            if (v) {
                var w = hs(v[h]());
                w ? (e = w[0], r = Number(w[1])) : bb.trace(2, "WebVR - unknown device: " + v)
            }
        }
        r == 0 && f == t && (xi == t && (xi = n, bb[tt](Pr[gn], Pr)), yi ? r = 7 : r = 5);
        var E = Math[Sn](r * r / (1 + o / u * (o / u))) * 25.4,
            S = E * o / u;
        return ls = {
            screendiagonal_inch: r,
            screenwidth_mm: E,
            screenheight_mm: S,
            screenwidth_px: u * a,
            screenheight_px: o * a,
            devicename: e,
            best_res: i
        }, ls
    }

    function hs(e) {
        var t = {
            "sm-n750": ["Note 3 Neo", 5.5],
            "sm-n900": ["Note 3", 5.7],
            "sm-n910": ["Note 4", 5.7],
            "sm-n916": ["Note 4", 5.7],
            "sm-n920": ["Note 5", 5.7],
            "sm-n915": ["Note Edge", 5.6],
            "gt-i930": [Zn, 4.7],
            "gt-i950": [er, 4.7],
            "galaxy-s3": [Zn, 4.7],
            "galaxy-s4": [er, 4.7],
            "sc-04f": [xt, 5.1],
            "[scl23": [xt, 5.1],
            "sm-g530": ["Galaxy Grand Prime", 5],
            "sm-g720": ["Galaxy Grand Max", 5.25],
            "sm-g800": ["Galaxy S5 Mini", 4.5],
            "sm-g850": ["Galaxy Alpha", 4.7],
            "sm-g860": ["Galaxy S5 Sport", 5.1],
            "sm-g870": ["Galaxy S5 Active", 5.1],
            "sm-g890": ["Galaxy S6 Active", 5.1],
            "sm-g903": ["Galaxy S5 Neo", 5.1],
            "sm-g900": [xt, 5.1],
            "sm-g906": [xt, 5.1],
            "sm-g901": ["Galaxy S5+", 5.1],
            "sm-g920": ["Galaxy S6", 5.1],
            "sm-g925": ["Galaxy S6 Edge", 5.1],
            "sm-g928": ["Galaxy S6+ Edge", 5.7],
            "sm-g930": ["Galaxy S7", 5.1],
            "sm-g935": ["Galaxy S7 Edge", 5.5],
            "sm-a300": [tr, 4.5],
            "sm-a310": [tr, 4.7],
            "sm-a500": [nr, 5],
            "sm-a510": [nr, 5.2],
            "sm-a700": [rr, 5.5],
            "sm-a710": [rr, 5.5],
            "sm-a800": ["Galaxy A8", 5.7],
            "sm-a900": ["Galaxy A9", 6],
            "sm-e500": ["Galaxy E5", 5],
            "sm-e700": ["Galaxy E7", 5.5],
            "sm-j320": ["Galaxy J3", 5],
            "sm-j500": ["Galaxy J5", 5],
            "sm-j700": ["Galaxy J7", 5.5],
            c6916: ["Xperia Z1s", 5],
            c6902: [yt, 5],
            c6903: [yt, 5],
            c6906: [yt, 5],
            c6943: [yt, 5],
            c6802: [lt, 6.4],
            c6806: [lt, 6.4],
            c6833: [lt, 6.4],
            d5503: ["Xperia Z1 Compact", 4.3],
            d2533: ["Xperia C3", 5.5],
            d6563: ["Xperia Z2a", 5],
            d5322: ["Xperia T2", 6],
            d5803: [on, 4.6],
            d5833: [on, 4.6],
            d6603: [wt, 5.2],
            d6633: [wt, 5.2],
            d6653: [wt, 5.2],
            d6708: [wt, 5.2],
            e5633: [bt, 5],
            e5643: [bt, 5],
            e5653: [bt, 5],
            e5663: [bt, 5],
            e5303: [D, 5.5],
            e5306: [D, 5.5],
            e5333: [D, 5.5],
            e5343: [D, 5.5],
            e5353: [D, 5.5],
            e5363: [D, 5.5],
            e5506: [dt, 6],
            e5533: [dt, 6],
            e5553: [dt, 6],
            e5563: [dt, 6],
            e6508: ["Xperia Z4v", 5.2],
            e6533: ["Xperia Z3+", 5.2],
            e6603: [Yn, 5.2],
            "xperia-z4": ["Xperia Z4", 5.2],
            "xperia-z5": [Yn, 5.2],
            "so-02h": ["Xperia Z5 Compact", 4.6],
            "so-03h": ["Xperia Z5 Premium", 5.5],
            "lg-d80": [dn, 5.2],
            "lg-f320": [dn, 5.2],
            "[vs980": [dn, 5.2],
            "lg-ls980": [dn, 5.2],
            "lg-d85": [B, 5.5],
            lgls990: [B, 5.5],
            lgus990: [B, 5.5],
            "lg-as990": [B, 5.5],
            "lg-fs400": [B, 5.5],
            "lg-fs460": [B, 5.5],
            lgv31: [B, 5.5],
            "[as985": [B, 5.5],
            "[vs985": [B, 5.5],
            "lg-f460": ["LG G3 Prime", 5.5],
            "lg-d690": ["LG G3 Stylus", 5.5],
            "lg-d722": [Wt, 5],
            "lg-d724": [Wt, 5],
            "lg-d725": [Wt, 5],
            "lg-d728": [Wt, 5],
            "lg-h525": ["LG G4c", 5],
            "lg-h735": ["LG G4 Beat", 5.5],
            "lg-as811": [T, 5.5],
            "lg-as991": [T, 5.5],
            "lg-f500": [T, 5.5],
            "lg-h810": [T, 5.5],
            "lg-h811": [T, 5.5],
            "lg-h812": [T, 5.5],
            "lg-h815": [T, 5.5],
            "lg-h818": [T, 5.5],
            "lg-h819": [T, 5.5],
            lgus991: [T, 5.5],
            lgls991: [T, 5.5],
            "[as986": [T, 5.5],
            "[vs986": [T, 5.5],
            h830: [Vn, 5.3],
            h840: [Vn, 5.3],
            h850: [Vn, 5.3],
            "lg-e98": [an, 5.5],
            "lg-f240": [an, 5.5],
            "lg-h420": [or, 4.7],
            "lg-h440": [or, 4.7],
            "lg-h500": [ln, 5],
            "lg-h502": [ln, 5],
            "lg-h520": [ln, 5],
            "lg-h540": [N, 5.7],
            "lg-h542": [N, 5.7],
            "lg-h630": [N, 5.7],
            "lg-h631": [N, 5.7],
            "lg-h635": [N, 5.7],
            lgms631: [N, 5.7],
            "lg-f600": [et, 5.7],
            "lg-h900": [et, 5.7],
            "lg-h901": [et, 5.7],
            "lg-h961": [et, 5.7],
            "lg-h962": [et, 5.7],
            "[vs990": [et, 5.7],
            "lg-d95": [Gt, 6],
            "lg-fs340": [Gt, 6],
            "lg-ls995": [Gt, 6],
            "lg-f510": [P, 5.5],
            "lg-h95": [P, 5.5],
            lgas995: [P, 5.5],
            lgls996: [P, 5.5],
            lgus996: [P, 5.5],
            "htc-x9u": ["HTC One X9", 5.5],
            "htc-m9p": [Rn, 5.2],
            "htc-one-m9p": [Rn, 5.2],
            "htc-one-m9": [$t, 5],
            "htc-m9u": [$t, 5],
            htc6535: [$t, 5],
            "htc-m8s": [Kn, 5],
            "htc-one-e8": [Kn, 5],
            "htc-m8": [Z, 5],
            "htc-one-m8": [Z, 5],
            "htc-0p6b": [Z, 5],
            htc6525: [Z, 5],
            "htc-a9": [Jn, 5],
            "htc-one-a9": [Jn, 5],
            "htc-one-e9": [Xn, 5.5],
            "htc-d826": [Xn, 5.5],
            "htc-desire-eye": ["HTC Desire Eye", 5.2],
            "htc-d728": [yn, 5.5],
            "htc-desire-728": [yn, 5.5],
            "htc-d626": [Cn, 5],
            "htc-d630": [Cn, 5],
            "htc-d828": ["HTC Desire 828", 5.5],
            "htc-desire-820": ["HTC Desire 820", 5.5],
            "htc-b830x": ["HTC Butterfly 3", 5.2],
            "htc-one]": [Tr, 4.7],
            "htcone]": [Tr, 4.7],
            moto3: ["Moto G Turbo", 5],
            xt105: [Yt, 4.7],
            xt106: [Yt, 4.7],
            xt108: [Yt, 4.7],
            xt109: [Yt, 4.7],
            xt1021: [Fn, 5.5],
            xt1563: [Fn, 5.5],
            xt157: ["Moto X Style", 5.7],
            xt125: ["Moto Droid Turbo", 5.2],
            xt1580: ["Moto X Force", 5.4],
            xt1585: ["Moto Droid Turbo 2", 5.4],
            "mt8-": ["Mate 8", 6],
            "mt7-": ["Mate 7", 6],
            "crr-": ["Mate S", 5.5],
            "hol-u19": ["Honor Holly", 5],
            "chm-u": ["Honor 4C", 5],
            "che1-": [gr, 5.5],
            "che2-": [gr, 5.5],
            "kiw-tl00h": ["Honor 5X", 5.5],
            "h60-l01": ["Honor 6", 5],
            "pe-tl10": [dr, 5.5],
            "pe-ul00": [dr, 5.5],
            "plk-l01": [Lr, 5.2],
            "plk-ul00": [Lr, 5.2],
            "ath-al00": ["Honor 7i", 5.2],
            "tit-": ["Enjoy 5", 5],
            "ale-l21": ["P8lite", 5],
            "ale-ul00": ["P8lite", 5],
            "gra-l09": ["P8", 5.2],
            "gra-ul10": ["P8", 5.2],
            p8max: ["P8max", 6.8],
            "p7-l": ["P7", 5],
            "p6-u06": ["P6", 4.7],
            "rio-l01": ["G8", 5.5],
            "g7-tl00": ["G7", 5.5],
            "rio-al00": ["G7+", 5.5],
            "scc-u21": ["Y6", 5],
            "scl-l21": ["Y6", 5],
            "hol-t00": ["3C", 5],
            a7010: ["Vibe K4 Note", 5.5],
            x3a40: ["Vibe X3", 5.5],
            "k50-t5": ["K3 Note", 5.5],
            a7000: ["A7000", 5.5],
            a6000: ["A6000", 5.5],
            "redmi-note-3": ["Redmi Note 3", 5.5],
            "redmi-note-2": ["Redmi Note 2", 5.5],
            "redmi-3": ["Redmi 3", 5],
            "redmi-2": ["Redmi 2", 4.7],
            "mi-4": ["Mi 4", 5],
            "mi-3": ["Mi 3", 5],
            "mi-note": ["Mi Note", 5.7],
            ze551ml: ["Zenfone 2", 5.5],
            ze601kl: [Y, 6],
            z011d: [Y, 6],
            ze551kl: [Y, 5.5],
            zd551kl: [wn, 5.5],
            z00ud: [wn, 5.5],
            zx550: [Dn, 5.5],
            zx551ml: [Dn, 5.5],
            "one a2003": ["OnePlus 2", 5.5],
            "[one]": [W, 5.5],
            a0001: [W, 5.5],
            e1003: ["OnePlus X", 5],
            a2001: [W, 5.5],
            a2005: [W, 5.5],
            "lumia-520": ["Lumia 520", 4],
            "lumia-535": ["Lumia 535", 5],
            "lumia-540": ["Lumia 540", 5],
            "lumia-550": ["Lumia 550", 4.7],
            "lumia-630": ["Lumia 630", 4.5],
            "lumia-635": ["Lumia 635", 4.5],
            "lumia-640-xl": ["Lumia 640 XL", 5.7],
            "lumia-640": ["Lumia 640", 5],
            "lumia-730": ["Lumia 730", 4.7],
            "lumia-735": ["Lumia 735", 4.7],
            "lumia-830": ["Lumia 830", 5],
            "lumia-930": ["Lumia 930", 5],
            "lumia-950-xl": ["Lumia 950 XL", 5.7],
            "lumia-950": ["Lumia 950", 5.2],
            "lumia-1020": ["Lumia 1020", 4.5],
            "lumia-1320": ["Lumia 1320", 6],
            "lumia-1520": ["Lumia 1520", 6],
            "nexus-4": ["Nexus 4", 4.7],
            "nexus-5x": [cr, 5.2],
            "nexus-5": ["Nexus 5", 5],
            "lg-h791": [cr, 5.2],
            "nexus-6p": ["Nexus 6P", 5.7],
            "nexus-6": ["Nexus 6", 5.96],
            "[list-end]": [Ar, 5]
        };
        e = "[" + e + "]";
        for (dev in t)
            if (e[p](dev) >= 0) {
                var n = t[dev];
                return Array.isArray(n) || (n = t[n]), n
            }
        return s
    }

    function ps() {
        ei < 1 ? ei = 1 : ei > 179.9 && (ei = 179.9), ti < 0 ? ti = 0 : ti > 5 && (ti = 5);
        var e = ni[tn]("|"),
            t;
        for (t = 0; t < 4; t++) {
            var r = Number(e[t]);
            isNaN(r) && (r = t == 0 ? 1 : 0), ri[t] = r
        }
        ii = ri[0] != 1 || ri[1] != 0 || ri[2] != 0 || ri[3] != 0, Ti[f] && (gi || bi) && (ds(0, 0), Ma(n))
    }

    function ds(e, r) {
        var i = cs(),
            s = 0,
            o = 0,
            u = bb[En].canvas;
        if (u) {
            var a = Number(bb[E].framebufferscale);
            s = u[Tt], o = u[F], !isNaN(a) && a != 0 && (s /= a, o /= a)
        }
        if (e <= 0 || r <= 0) e = s, r = o;
        var f = ei,
            l = ti;
        f = Math.tan(f * .5 * ji), l = Math.exp(l) - 1;
        var c = Math.atan(f) * 2 / 2,
            h = l * 1e3,
            p = 1e3,
            d = p * Math.sin(c),
            v = p * Math.cos(c),
            m = 2 * Math.atan(d / (h + v));
        f = Math.tan(m / 2);
        var g = l,
            y = Gr;
        y /= Zr;
        var b = i.screenwidth_mm,
            w = i.screenheight_mm;
        if (Yr > 0) {
            var S = Math.min(screen[Tt], screen[F]),
                x = Math.max(screen[Tt], screen[F]);
            b = Math[Sn](Yr * Yr / (1 + S / x * (S / x))) * 25.4, w = b * S / x
        }
        var T = b / 2 - y,
            N = 2 * (T / b),
            C = e,
            k = r,
            L = i.screenwidth_px,
            A = i.screenheight_px,
            O = n;
        if (yi || Dr.tablet || r > e) O = t;
        C <= 0 && (C = s), k <= 0 && (k = o);
        var M = w / 70.9,
            _ = f;
        _ *= M, Oi = M / .69, O && (_ *= k / A, N = 2 * (b * (C / L) / 2 - y) / (b * (C / L)));
        var D = 2 * Math.atan(_) * Fi;
        Mi = D, _i = g, Di = N, vs()
    }

    function vs() {
        var e = bb[u];
        Mi > 0 && (e[ut] = _i, e.fov = Mi, e[Vt] = Mi, e[Xt] = Mi, e[b] = 0, e[st] = pr, e[k] = n, e[S] = 0, e[_] = Gn, e[g] = 0, e[it] = 0, bb[E][vt] = Di)
    }

    function ms() {
        var e = bb[u];
        e[st] = pr, e[_] = Gn, e[k] = n, e[S] = 0, e[g] = 0, e[it] = 0, e[Vt] = 0, e[Xt] = 179, e.fov = ns, e[ut] = 0, e[b] = 0
    }

    function gs() {
        return Dr[w] && $i && $i.deviceName ? $i.deviceName : (cs(), ls ? ls[Qn] : "")
    }

    function ys() {
        return ls ? ls.screendiagonal_inch : 0
    }

    function bs(e) {
        if (("" + e)[h]() == Zt) Yr = 0, ps();
        else {
            var t = parseFloat(e);
            if (isNaN(t) || t <= 0) t = 0;
            Yr = t, ps()
        }
    }

    function ws() {
        var e = Yr;
        return e <= 0 ? Zt : e
    }

    function Es() {
        return Dr[A] && Ei == t ? bb[E][q] : bb[En].canvas
    }

    function Ss() {
        Ti[f] && (gi || bi) && (ds(0, 0), Ma(n))
    }

    function xs() {
        if (mi && vi == t)
            if (gi == t)
                if (bc) {
                    Dr[A] && Dr[c][m][a] && Hr[o](Dr[c][m][a], Fs);
                    if (co()) {
                        zr && Dr[w] && Ei == t && bb.set(gt, n);
                        var e = {
                                source: bb[En].canvas
                            },
                            r = t,
                            i = navigator[mt][p]("Chrome/51.0.");
                        i > 0 && parseInt(navigator[mt][zt](i + 12)) < 2701 && (r = n), r == t && (e = [e]), bc.requestPresent(e).then(function() {
                            Ti[f] = n, fs(n), Ni = n;
                            var e = bb[E][q];
                            window.activekrpanowindow = e.id, e.focus()
                        }, function() {})
                    } else Ti[f] = n, Ni = t, fs(n), Ts(n)
                } else {
                    var s = Es();
                    Dr[c][m][a] && Hr[o](Dr[c][m][a], Is), Ti[f] = n, fs(n), Ni = n, bi = t, ui == t && Dr[A] && (bi = n), bi && (Ni = t), s[Dr[c][m].requestfullscreen]({
                        vrDisplay: $i,
                        vrDistortion: Ni
                    }), Dr[hn] && Ls(bb[u][O]), Ni == t && ds()
                }
            else {
                Dr[c][m][a] && Hr[o](Dr[c][m][a], Is), Ti[f] = n, fs(n);
                if (Dr[hn] || Dr.tablet) Ci == 1 ? window[o](v, uo, n) : Ci == 2 && window[o](C, yu, n);
                yi == t && Dr[c][m].touch && bb[x][kt][o](Dr[c][m][qn], Os, t)
            }
    }

    function Ts(e) {
        if (Dr[w] || Jr == t) return;
        try {
            var n = typeof screen[d] == "object" && screen[d].type && screen[d].lock;
            if (e) {
                var r = "" + (n ? screen[d].type : screen[d] || screen[br]),
                    i = r[p](Jt) >= 0 ? r : Jt;
                screen[fr] ? screen[fr](i) : screen[_n] ? screen[_n](i) : n && screen[d].lock(i)
            } else screen[In] ? screen[In]() : screen[Tn] ? screen[Tn]() : n && screen[d].unlock()
        } catch (s) {}
    }

    function Ns() {
        Ti[f] = t, bb.get(gt) && bb.set(gt, t), bc && co() && bc.exitPresent(), window[r](v, uo, n), window[r](C, yu, n), Dr[c][m].touch && bb[x][kt][r](Dr[c][m][qn], Os, t), fs(t), bb[u][Q] = n
    }

    function Cs() {
        mi && (vi ? Ns() : xs())
    }

    function ks(e) {
        Ls(e, n)
    }

    function Ls(e, t) {
        t === undefined && (t = n), e === undefined ? e = Number.NaN : e = Number(e), isNaN(e) && bb.xml && bb.xml[u] && (e = Number(bb.xml[u][O]), isNaN(e) && (e = 0));
        var r = qr;
        if (t == n)
            if (bc) bc.resetPose(), r = 0, Ai = 0;
            else if (Ji) {
                try {
                    Ji.resetSensor !== undefined && Ji.resetSensor()
                } catch (i) {}
                try {
                    Ji.zeroSensor !== undefined && Ji.zeroSensor()
                } catch (i) {}
                r = 0, Ai = 0
            }
        yi && (bb[u][O] = e), Ai = Ai - r + e, qs = 0
    }

    function Os(e) {
        var i = t;
        if (Xr == t) i = n;
        else {
            var u = bb[x].getMousePos(e[Sr] ? e[Sr][0] : e);
            u.x /= bb.stagescale, u.y /= bb.stagescale;
            if (e.type == Dr[c][m][qn]) As == s ? (As = u, bb[x][kt][o](Dr[c][m][ur], Os, n), bb[x][kt][o](Dr[c][m][xr], Os, n)) : i = n;
            else if (e.type == Dr[c][m][xr]) i = n;
            else if (e.type == Dr[c][m][ur] && As) {
                var a = As.x,
                    f = u.x;
                if (bb[E][Pn]) {
                    var l = bb.stagewidth * .5;
                    (a >= l || f >= l) && (a < l || f < l) && (f = a)
                }
                var h = bb[Er](a, As.y, t),
                    p = bb[Er](f, u.y, t),
                    d = p.x - h.x;
                As = u, Ai -= d
            }
        }
        i && (As = s, bb[x][kt][r](Dr[c][m][ur], Os, n), bb[x][kt][r](Dr[c][m][xr], Os, n))
    }

    function Ms() {
        if (Rr == t) bb[Mt] = -1, bb[ft] = t;
        else if (bb.image.type == "cube" && bb.image.multires) {
            var e = cs().best_res,
                r = 0,
                s = -1,
                o = 0,
                u = bb.image.level.getArray(),
                a = u[Kt];
            if (a > 0)
                for (i = 0; i < a; i++) {
                    var f = u[i].tiledimagewidth,
                        l = Math.abs(f - e);
                    if (s == -1 || l < s) r = f, s = l, o = i
                }
            if (s > 0) {
                bb[Mt] = o, bb[ft] = n;
                if (r > 0) {
                    var c = 4 + 8 * (r * r * 6 + 1048575 >> 20);
                    c > bb.memory[ir] && (bb.memory[ir] = c)
                }
            }
        }
    }

    function _s() {
        Ti[f] && Ms()
    }

    function Ds() {
        _s(), ps()
    }

    function Hs() {
        ki = 0, ro.t = 0, io.t = 0, Zu(), ra = 0, Yu = t, lu = s
    }

    function js(e) {
        Bs == 1 ? (Bi.apply(document), Bs = 0) : (Hi.apply(Es()), Bs = 1)
    }

    function Fs(e) {
        var n = !!(Hr[Dt] || Hr[K] || Hr[ht] || Hr[R] || Hr[ot]);
        n == t && Ns()
    }

    function Is(e) {
        var i = Es(),
            s = !!(Hr[Dt] || Hr[K] || Hr[ht] || Hr[R] || Hr[ot]);
        if (s && Ti[f]) {
            try {
                Dr[w] && Pi && (Hi.apply(i), yi && (Bs = 1, bb[x][kt][o](U, js, t)))
            } catch (u) {}
            Ts(n), Dr[w] && (Rs = 5, i[o](ct, Us, t))
        } else Ts(t), window[r](v, uo, n), window[r](C, yu, n), i[r](ct, Us, t), bb[x][kt][r](U, js, t), Ti[f] = t, fs(t)
    }

    function Us(e) {
        var t = Es();
        bc && (t = bb[E][q]);
        if (Hr[jn] === t || Hr[vn] === t) {
            var n = e.movementX || e.mozMovementX,
                r = e.movementY || e.mozMovementY;
            if (Rs > 0) {
                Rs--;
                return
            }
            if (!isNaN(n)) {
                qs += n * jr;
                while (qs < 0) qs += Math.PI * 2;
                while (qs >= Math.PI * 2) qs -= Math.PI * 2
            } else n = 0;
            yi && (isNaN(r) && (r = 0), Ir && (bb[u][O] += n * jr * Fi, bb[u][en] = Math.max(Math.min(bb[u][en] + r * jr * Fi, 120), -120)))
        }
    }

    function zs(e, t, n, r) {
        this.x = e, this.y = t, this.z = n, this.w = r
    }

    function Ws(e) {
        var t = Math[Sn](e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w);
        t === 0 ? (e.x = e.y = e.z = 0, e.w = 1) : (t = 1 / t, e.x *= t, e.y *= t, e.z *= t, e.w *= t)
    }

    function Xs(e) {
        e.x *= -1, e.y *= -1, e.z *= -1, Ws(e)
    }

    function Vs(e, t) {
        return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w
    }

    function $s(e) {
        return Math[Sn](e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w)
    }

    function Js(e, t) {
        var n = e.x,
            r = e.y,
            i = e.z,
            s = e.w,
            o = t.x,
            u = t.y,
            a = t.z,
            f = t.w;
        e.x = n * f + s * o + r * a - i * u, e.y = r * f + s * u + i * o - n * a, e.z = i * f + s * a + n * u - r * o, e.w = s * f - n * o - r * u - i * a
    }

    function Ks(e, t) {
        var n = t.x,
            r = t.y,
            i = t.z,
            s = t.w,
            o = e.x,
            u = e.y,
            a = e.z,
            f = e.w;
        e.x = n * f + s * o + r * a - i * u, e.y = r * f + s * u + i * o - n * a, e.z = i * f + s * a + n * u - r * o, e.w = s * f - n * o - r * u - i * a
    }

    function Qs(e, t, n) {
        var r = e.x,
            i = e.y,
            s = e.z,
            o = e.w,
            u = r * t.x + i * t.y + s * t.z + o * t.w;
        u < 0 ? (u = -u, e.x = -t.x, e.y = -t.y, e.z = -t.z, e.w = -t.w) : (e.x = t.x, e.y = t.y, e.z = t.z, e.w = t.w);
        if (u >= 1) {
            e.w = o, e.x = r, e.y = i, e.z = s;
            return
        }
        var a = Math.acos(u),
            f = Math[Sn](1 - u * u);
        if (Math.abs(f) < .001) {
            e.w = .5 * (o + e.w), e.x = .5 * (r + e.x), e.y = .5 * (i + e.y), e.z = .5 * (s + e.z);
            return
        }
        var l = Math.sin((1 - n) * a) / f,
            c = Math.sin(n * a) / f;
        e.w = o * l + e.w * c, e.x = r * l + e.x * c, e.y = i * l + e.y * c, e.z = s * l + e.z * c
    }

    function Gs(e, t, n) {
        var r = n / 2,
            i = Math.sin(r);
        e.x = t.x * i, e.y = t.y * i, e.z = t.z * i, e.w = Math.cos(r)
    }

    function Ys(e, t, n, r, i) {
        var s = Math.cos(t / 2),
            o = Math.cos(n / 2),
            u = Math.cos(r / 2),
            a = Math.sin(t / 2),
            f = Math.sin(n / 2),
            l = Math.sin(r / 2);
        return i === "XYZ" ? (e.x = a * o * u + s * f * l, e.y = s * f * u - a * o * l, e.z = s * o * l + a * f * u, e.w = s * o * u - a * f * l) : i === pn ? (e.x = a * o * u + s * f * l, e.y = s * f * u - a * o * l, e.z = s * o * l - a * f * u, e.w = s * o * u + a * f * l) : i === "ZXY" ? (e.x = a * o * u - s * f * l, e.y = s * f * u + a * o * l, e.z = s * o * l + a * f * u, e.w = s * o * u - a * f * l) : i === "ZYX" ? (e.x = a * o * u - s * f * l, e.y = s * f * u + a * o * l, e.z = s * o * l - a * f * u, e.w = s * o * u + a * f * l) : i === "YZX" ? (e.x = a * o * u + s * f * l, e.y = s * f * u + a * o * l, e.z = s * o * l - a * f * u, e.w = s * o * u - a * f * l) : i === "XZY" && (e.x = a * o * u - s * f * l, e.y = s * f * u - a * o * l, e.z = s * o * l + a * f * u, e.w = s * o * u + a * f * l), e
    }

    function Zs(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h, p, d;
        i = t.x, s = t.y, o = t.z, u = Math[Sn](i * i + s * s + o * o), u > 0 && (i /= u, s /= u, o /= u), a = n.x, f = n.y, l = n.z, c = Math[Sn](a * a + f * f + l * l), c > 0 && (a /= c, f /= c, l /= c), r = i * a + s * f + o * l + 1, r < 1e-6 ? (r = 0, Math.abs(i) > Math.abs(o) ? (h = -s, p = i, d = 0) : (h = 0, p = -o, d = s)) : (h = s * l - o * f, p = o * a - i * l, d = i * f - s * a), e.x = h, e.y = p, e.z = d, e.w = r, Ws(e)
    }

    function eo(e, t, n) {
        function r(e, t, n) {
            return e < t ? t : e > n ? n : e
        }
        if (!t || isNaN(t.x) || isNaN(t.y) || isNaN(t.z) || isNaN(t.w)) return;
        var i = t.x * t.x,
            s = t.y * t.y,
            o = t.z * t.z,
            u = t.w * t.w;
        if (n === "XYZ") e[0] = Math[jt](2 * (t.x * t.w - t.y * t.z), u - i - s + o), e[1] = Math.asin(r(2 * (t.x * t.z + t.y * t.w), -1, 1)), e[2] = Math[jt](2 * (t.z * t.w - t.x * t.y), u + i - s - o);
        else if (n === pn) e[0] = Math.asin(r(2 * (t.x * t.w - t.y * t.z), -1, 1)), e[1] = Math[jt](2 * (t.x * t.z + t.y * t.w), u - i - s + o), e[2] = Math[jt](2 * (t.x * t.y + t.z * t.w), u - i + s - o);
        else if (n === "ZXY") e[0] = Math.asin(r(2 * (t.x * t.w + t.y * t.z), -1, 1)), e[1] = Math[jt](2 * (t.y * t.w - t.z * t.x), u - i - s + o), e[2] = Math[jt](2 * (t.z * t.w - t.x * t.y), u - i + s - o);
        else if (n === "ZYX") e[0] = Math[jt](2 * (t.x * t.w + t.z * t.y), u - i - s + o), e[1] = Math.asin(r(2 * (t.y * t.w - t.x * t.z), -1, 1)), e[2] = Math[jt](2 * (t.x * t.y + t.z * t.w), u + i - s - o);
        else if (n === "YZX") e[0] = Math[jt](2 * (t.x * t.w - t.z * t.y), u - i + s - o), e[1] = Math[jt](2 * (t.y * t.w - t.x * t.z), u + i - s - o), e[2] = Math.asin(r(2 * (t.x * t.y + t.z * t.w), -1, 1));
        else {
            if (n !== "XZY") return;
            e[0] = Math[jt](2 * (t.x * t.w + t.y * t.z), u - i + s - o), e[1] = Math[jt](2 * (t.x * t.z + t.y * t.w), u + i - s - o), e[2] = Math.asin(r(2 * (t.z * t.w - t.x * t.y), -1, 1))
        }
    }

    function to(e, t) {
        var n, r, i, o;
        e == s ? (n = Math.tan(50 * ji), r = Math.tan(50 * ji), i = Math.tan(45 * ji), o = Math.tan(45 * ji)) : (n = Math.tan(e.upDegrees * ji), r = Math.tan(e.downDegrees * ji), i = Math.tan(e.leftDegrees * ji), o = Math.tan(e.rightDegrees * ji));
        var u = 2 / (i + o),
            a = 2 / (n + r);
        t[0] = u, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -a, t[6] = 0, t[7] = 0, t[8] = (i - o) * u * .5, t[9] = -((n - r) * a * .5), t[10] = 65535 / 65536, t[11] = 1, t[12] = 0, t[13] = 0, t[14] = 65535 / 65536 - 1, t[15] = 1
    }

    function no() {
        var e = Number.NaN,
            t = screen[Tt] > screen[F],
            n = screen[d] || screen.msOrientation || screen[br];
        if (n) {
            n = ("" + n)[h]();
            var r = n[p]("portrait") >= 0,
                i = n[p](Jt) >= 0,
                s = n[p]("primary") >= 0,
                o = n[p]("secondary") >= 0;
            r && s ? e = 0 : i && s ? e = 90 : i && o ? e = -90 : r && o && (e = 180), !isNaN(e) && !Dr[hn] && (e -= 90)
        }
        return isNaN(e) && (e = bb._have_top_access ? top[d] : window[d]), isNaN(e) && (Dr[hn] ? e = t ? 90 : 0 : e = t ? 0 : 90), Dr.tablet && Dr[rt] && (e += 90), e
    }

    function uo(e) {
        if (!Ti[f]) return;
        var t = bb[St],
            n = t - gu;
        gu = t;
        var r = no() * ji,
            i = e.alpha * ji,
            o = e.beta * ji,
            u = e.gamma * ji;
        oo === s && (oo = i), i = i - oo + Math.PI;
        var a = Math.cos(i),
            l = Math.sin(i),
            c = Math.cos(o),
            h = Math.sin(o),
            p = Math.cos(u),
            d = Math.sin(u);
        i = Math[jt](-l * h * p - a * d, l * d - a * h * p), o = -Math.asin(c * p), u = Math[jt](c * d, -h) - Math.PI, ro.q.x = io.q.x, ro.q.y = io.q.y, ro.q.z = io.q.z, ro.q.w = io.q.w, ro.t = io.t;
        var v = io.q;
        io.t = t, ki++, Ys(v, o, i + r, u - r, pn)
    }

    function lo() {
        if (Ti[f]) {
            bb[u][L] = n, bb.autorotate.interrupt();
            var e = [0, 0, 0];
            if (bc) {
                var t = s;
                Vi ? bc.getFrameData(Vi) && (t = Vi.pose) : t = bc.getPose();
                if (t) {
                    ao = t;
                    var r = t[d];
                    fo.x = r[0], fo.y = r[1], fo.z = r[2], fo.w = r[3], eo(e, fo, pn);
                    var i = 0;
                    Dr[A] && (i = no()), i += Ai, qr = (-e[1] + qs) * Fi + i, Ir && (bb[u][O] = qr, bb[u][en] = -e[0] * Fi, bb[u][An] = -e[2] * Fi)
                }
            } else if (Ji) {
                Gi = Ji.getState();
                if (Gi) {
                    bi ? vs() : ms();
                    if (Fr && Ir) {
                        var o = Gi.position;
                        if (o) {
                            qs = 0;
                            var a = 400;
                            bb[u].tx = o.x * a, bb[u].ty = o.y * a, bb[u].tz = o.z * a
                        }
                    }
                    eo(e, Gi[d], pn);
                    var i = 0;
                    Dr[A] && (i = no()), i += Ai, qr = (-e[1] + qs) * Fi + i, Ir && (bb[u][O] = qr, bb[u][en] = -e[0] * Fi, bb[u][An] = -e[2] * Fi)
                }
            } else if (gi) {
                vs();
                if (ki > Li) {
                    var l = s;
                    if (fi == 0) l = io.q;
                    else if ((fi == 4 || fi >= 6) && Ci == 2) l = io.q, vu(l);
                    else if (fi <= 3 || fi == 5 || Ci == 1)
                        if (ro.t > 0 && io.t > 0) {
                            var c = bb[St],
                                h = io.t - ro.t,
                                p = 0,
                                v = 0,
                                m = 1;
                            fi == 1 || fi == 2 ? p = c - io.t : (p = c - ro.t, m = 2), h <= 0 ? v = 1 : (v = p / h, v > m && (v = m)), so.x = ro.q.x, so.y = ro.q.y, so.z = ro.q.z, so.w = ro.q.w, Qs(so, io.q, v), l = so
                        }
                    if (l) {
                        eo(e, l, pn);
                        var i = no();
                        qr = Ai + (-e[1] + qs) * Fi + i, Ir && (bb[u][O] = qr, bb[u][en] = -e[0] * Fi, bb[u][An] = -e[2] * Fi)
                    }
                }
            }
        }
    }

    function co() {
        var e = n;
        return Dr[A] && ui == t && (e = t), e
    }

    function ho(e) {
        return bc && co() ? (bc.requestAnimationFrame(e), n) : t
    }

    function po() {
        bc && bc[$] && ao && (Vi ? bc.submitFrame() : bc.submitFrame(ao))
    }

    function vo(e, r) {
        if (gi == t && Ni == n)
            if (bc)
                if (Vi) {
                    var i = e == 1 ? Vi.leftProjectionMatrix : Vi.rightProjectionMatrix;
                    r[0] = i[0], r[1] = i[1], r[2] = i[2], r[3] = i[3], r[4] = -i[4], r[5] = -i[5], r[6] = -i[6], r[7] = -i[7], r[8] = -i[8], r[9] = -i[9], r[10] = -i[10], r[11] = -i[11], r[12] = i[12], r[13] = i[13], r[14] = i[14], r[15] = i[15], r[10] = 65535 / 65536, r[14] = 65535 / 65536 - 1
                } else {
                    var s = bc[y](e == 1 ? Bt : G);
                    to(s.fieldOfView, r)
                }
            else to(e == 1 ? es : ts, r)
    }

    function mo(e) {
        var t = 0;
        if (bc) {
            var n = bc[y](e == 1 ? Bt : G);
            t = n.offset[0]
        } else e == 1 ? Yi && Yi.x ? t = Yi.x : t = -0.03 : e == 2 && (Zi && Zi.x ? t = Zi.x : t = .03);
        return t *= 320 / Br, t
    }

    function go(e, r) {
        var i = 0,
            o = 0;
        if (bc) {
            if (bc[$]) {
                var u = bc[y](Bt),
                    a = bc[y](G);
                i = Math.max(u.renderWidth, a.renderWidth) * 2, o = Math.max(u.renderHeight, a.renderHeight);
                if (i > 0 && o > 0) return i *= Ur, o *= Ur, {
                    w: i,
                    h: o
                }
            }
            return s
        }
        var l = !!(Hr[Dt] || Hr[K] || Hr[ht] || Hr[R] || Hr[ot]);
        if (Ti[f] && l && gi == t && Ni == n) {
            if (Ki) i = Math.max(Ki[J][Tt] + Qi[J][Tt], Qi[J].x + Qi[J][Tt]), o = Math.max(Ki[J][F], Qi[J][F]);
            else if (M in $i) {
                var c = $i[M](Bt),
                    h = $i[M](G);
                i = c[Tt] + h[Tt], o = Math.max(c[F], h[F])
            } else if (pt in $i) {
                var p = $i[pt]();
                i = p[Tt], o = p[F]
            } else Lt in $i ? (i = $i[Lt][Tt], o = $i[Lt][F]) : (i = 2e3, o = 1056);
            Dr[w] && Dr[rt] && (i = e, o = r);
            if (i > 0 && o > 0) return i *= Ur, o *= Ur, {
                w: i,
                h: o
            }
        } else Ti[f] && (gi || Ni == t) && ds(e, r);
        return s
    }

    function yo(e) {
        var e = ("" + e)[h](),
            r = e[p](vr),
            i = e.lastIndexOf("]");
        if (r >= 0 && i > r) {
            var o = e[zt](r + 8, i),
                u = vr + o + "]";
            u != li && (li = u, hi && (bo(hi, t), hi = s), hi = bb.get(li), hi && bo(hi, n))
        }
    }

    function bo(e, r) {
        if (r == n) e[Un] = {
            visible: e[On],
            enabled: e[f],
            flying: e.flying,
            scaleflying: e[Ut],
            distorted: e[mn],
            zorder: e.zorder,
            scale: e.scale,
            depth: e.depth,
            onover: e.onover,
            onout: e.onout
        }, e[f] = t, e.flying = 1, e[Ut] = t, e[mn] = n, e.zorder = 999999999;
        else {
            var i = e[Un];
            i && (e[On] = i[On], e[f] = i[f], e.flying = i.flying, e[Ut] = i[Ut], e[mn] = i[mn], e.zorder = i.zorder, e.scale = i.scale, e.depth = i.depth, e.onover = i.onover, e.onout = i.onout, e[Un] = i = s)
        }
    }

    function wo() {
        if (li) {
            var e = hi;
            e == s && (e = bb.get(li), e && (bo(e, n), hi = e));
            if (e) {
                if (!Ti[f]) return e[On] = t, s;
                e.onover = pi, e.onout = di, e[f] = ci, e[On] = n
            }
            return e
        }
        return s
    }

    function Eo() {
        this.x = 0, this.y = 0, this.z = 0
    }

    function So(e, t, n, r) {
        e.x = t, e.y = n, e.z = r
    }

    function xo(e, t) {
        e.x = t.x, e.y = t.y, e.z = t.z
    }

    function To(e) {
        e.x = 0, e.y = 0, e.z = 0
    }

    function No(e, t, n) {
        t == 0 ? e.x = n : t == 1 ? e.y = n : e.z = n
    }

    function Co(e) {
        return Math[Sn](e.x * e.x + e.y * e.y + e.z * e.z)
    }

    function ko(e) {
        var t = Co(e);
        t > 0 ? Lo(e, 1 / t) : (e.x = 0, e.y = 0, e.z = 0)
    }

    function Lo(e, t) {
        e.x *= t, e.y *= t, e.z *= t
    }

    function Ao(e, t, n) {
        So(n, e.x - t.x, e.y - t.y, e.z - t.z)
    }

    function Oo(e, t, n) {
        So(n, e.y * t.z - e.z * t.y, e.z * t.x - e.x * t.z, e.x * t.y - e.y * t.x)
    }

    function Mo(e, t) {
        return e.x * t.x + e.y * t.y + e.z * t.z
    }

    function _o() {
        var e;
        return typeof Float64Array != "undefined" ? e = new Float64Array(9) : e = new Array(9), Po(e), e
    }

    function Do(e) {
        e[0] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = 0
    }

    function Po(e) {
        e[0] = e[4] = e[8] = 1, e[1] = e[2] = e[3] = e[5] = e[6] = e[7] = 0
    }

    function Ho(e, t) {
        e[0] = e[4] = e[8] = t
    }

    function Bo(e, t) {
        e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= t, e[4] *= t, e[5] *= t, e[6] *= t, e[7] *= t, e[8] *= t
    }

    function jo(e, t) {
        var n = e[1],
            r = e[2],
            i = e[5];
        t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = n, t[4] = e[4], t[5] = e[7], t[6] = r, t[7] = i, t[8] = e[8]
    }

    function Fo(e, t, n) {
        e[t] = n.x, e[t + 3] = n.y, e[t + 6] = n.z
    }

    function Io(e, t) {
        e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8]
    }

    function qo(e, t) {
        var n = e[0] * (e[4] * e[8] - e[7] * e[5]) - e[1] * (e[3] * e[8] - e[5] * e[6]) + e[2] * (e[3] * e[7] - e[4] * e[6]);
        n != 0 && (n = 1 / n, t[0] = (e[4] * e[8] - e[7] * e[5]) * n, t[1] = -(e[1] * e[8] - e[2] * e[7]) * n, t[2] = (e[1] * e[5] - e[2] * e[4]) * n, t[3] = -(e[3] * e[8] - e[5] * e[6]) * n, t[4] = (e[0] * e[8] - e[2] * e[6]) * n, t[5] = -(e[0] * e[5] - e[3] * e[2]) * n, t[6] = (e[3] * e[7] - e[6] * e[4]) * n, t[7] = -(e[0] * e[7] - e[6] * e[1]) * n, t[8] = (e[0] * e[4] - e[3] * e[1]) * n)
    }

    function Ro(e, t) {
        e[0] -= t[0], e[1] -= t[1], e[2] -= t[2], e[3] -= t[3], e[4] -= t[4], e[5] -= t[5], e[6] -= t[6], e[7] -= t[7], e[8] -= t[8]
    }

    function Uo(e, t) {
        e[0] += t[0], e[1] += t[1], e[2] += t[2], e[3] += t[3], e[4] += t[4], e[5] += t[5], e[6] += t[6], e[7] += t[7], e[8] += t[8]
    }

    function zo(e, t, n) {
        var r = t[0],
            i = t[1],
            s = t[2],
            o = t[3],
            u = t[4],
            a = t[5],
            f = t[6],
            l = t[7],
            c = t[8],
            h = e[0],
            p = e[1],
            d = e[2];
        n[0] = h * r + p * o + d * f, n[1] = h * i + p * u + d * l, n[2] = h * s + p * a + d * c, h = e[3], p = e[4], d = e[5], n[3] = h * r + p * o + d * f, n[4] = h * i + p * u + d * l, n[5] = h * s + p * a + d * c, h = e[6], p = e[7], d = e[8], n[6] = h * r + p * o + d * f, n[7] = h * i + p * u + d * l, n[8] = h * s + p * a + d * c
    }

    function Wo(e, t, n) {
        var r = e[0] * t.x + e[1] * t.y + e[2] * t.z,
            i = e[3] * t.x + e[4] * t.y + e[5] * t.z,
            s = e[6] * t.x + e[7] * t.y + e[8] * t.z;
        n.x = r, n.y = i, n.z = s
    }

    function Xo(e, t, n) {
        n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n[4] = e[4] + t[4], n[5] = e[5] + t[5], n[6] = e[6] + t[6], n[7] = e[7] + t[7], n[8] = e[8] + t[8]
    }

    function tu(e, t, n) {
        Oo(e, t, $o);
        if (Co($o) == 0) Po(n);
        else {
            xo(Jo, e), xo(Ko, t), ko($o), ko(Jo), ko(Ko);
            var r = Go,
                i = Yo;
            Oo($o, Jo, Vo), r[0] = Jo.x, r[1] = Jo.y, r[2] = Jo.z, r[3] = $o.x, r[4] = $o.y, r[5] = $o.z, r[6] = Vo.x, r[7] = Vo.y, r[8] = Vo.z, Oo($o, Ko, Vo), i[0] = Ko.x, i[3] = Ko.y, i[6] = Ko.z, i[1] = $o.x, i[4] = $o.y, i[7] = $o.z, i[2] = Vo.x, i[5] = Vo.y, i[8] = Vo.z, zo(i, r, n)
        }
    }

    function nu(e, t) {
        var n = Mo(e, e),
            r = Math[Sn](n),
            i, s;
        if (n < 1e-8) i = 1 - 1 / 6 * n, s = .5;
        else if (n < 1e-6) s = .5 - .25 * (1 / 6) * n, i = 1 - n * (1 / 6) * (1 - .05 * n);
        else {
            var o = 1 / r;
            i = Math.sin(r) * o, s = (1 - Math.cos(r)) * o * o
        }
        iu(e, i, s, t)
    }

    function ru(e, t) {
        var n = (e[0] + e[4] + e[8] - 1) * .5;
        So(t, (e[7] - e[5]) / 2, (e[2] - e[6]) / 2, (e[3] - e[1]) / 2);
        var r = Co(t);
        if (n > Math.SQRT1_2) r > 0 && Lo(t, Math.asin(r) / r);
        else if (n > -Math.SQRT1_2) {
            var i = Math.acos(n);
            Lo(t, i / r)
        } else {
            var i = Math.PI - Math.asin(r),
                s = e[0] - n,
                o = e[4] - n,
                u = e[8] - n,
                a = Zo;
            s * s > o * o && s * s > u * u ? So(a, s, (e[3] + e[1]) / 2, (e[2] + e[6]) / 2) : o * o > u * u ? So(a, (e[3] + e[1]) / 2, o, (e[7] + e[5]) / 2) : So(a, (e[2] + e[6]) / 2, (e[7] + e[5]) / 2, u), Mo(a, t) < 0 && Lo(a, -1), ko(a), Lo(a, i), xo(t, a)
        }
    }

    function iu(e, t, n, r) {
        var i = e.x * e.x,
            s = e.y * e.y,
            o = e.z * e.z;
        r[0] = 1 - n * (s + o), r[4] = 1 - n * (i + o), r[8] = 1 - n * (i + s);
        var u = t * e.z,
            a = n * e.x * e.y;
        r[1] = a - u, r[3] = a + u, u = t * e.y, a = n * e.x * e.z, r[2] = a + u, r[6] = a - u, u = t * e.x, a = n * e.y * e.z, r[5] = a - u, r[7] = a + u
    }

    function su(e, t, n, r) {
        t *= ji, n *= ji, r *= ji;
        var i = Math.cos(t),
            s = Math.sin(t),
            o = Math.cos(n),
            u = Math.sin(n),
            a = Math.cos(r),
            f = Math.sin(r),
            l = i * u,
            c = s * u;
        e[0] = o * a, e[1] = l * a + i * f, e[2] = -c * a + s * f, e[3] = -o * f, e[4] = -l * f + i * a, e[5] = c * f + s * a, e[6] = u, e[7] = -s * o, e[8] = i * o
    }

    function ou(e, t) {
        var n = e[0] + e[4] + e[8],
            r;
        n > 0 ? (r = Math[Sn](1 + n) * 2, t.x = (e[5] - e[7]) / r, t.y = (e[6] - e[2]) / r, t.z = (e[1] - e[3]) / r, t.w = .25 * r) : e[0] > e[4] && e[0] > e[8] ? (r = Math[Sn](1 + e[0] - e[4] - e[8]) * 2, t.x = .25 * r, t.y = (e[3] + e[1]) / r, t.z = (e[6] + e[2]) / r, t.w = (e[5] - e[7]) / r) : e[4] > e[8] ? (r = Math[Sn](1 + e[4] - e[0] - e[8]) * 2, t.x = (e[3] + e[1]) / r, t.y = .25 * r, t.z = (e[7] + e[5]) / r, t.w = (e[6] - e[2]) / r) : (r = Math[Sn](1 + e[8] - e[0] - e[4]) * 2, t.x = (e[6] + e[2]) / r, t.y = (e[7] + e[5]) / r, t.z = .25 * r, t.w = (e[1] - e[3]) / r)
    }

    function vu(e) {
        if (bu) {
            var t = no();
            t != lu && (lu = t, su(hu, 0, 0, -t), su(cu, -90, 0, +t));
            var n;
            if (fi <= 1 || fi == 3) n = sa();
            else {
                var r = bb[St],
                    i = (r - uu) / 1e3,
                    s = i;
                fi == 2 ? s += 2 / 60 : fi == 6 ? s += 1 / 60 : fi == 7 && (s += 2 / 60), n = fa(s)
            }
            zo(hu, n, du), zo(du, cu, pu), ou(pu, e)
        }
    }

    function yu(e) {
        if (!Ti[f]) return;
        var r = bb[St],
            i = r - gu;
        gu = r, i > 5e3 && (Hs(), i = .16), ki++;
        if (ki < Li) return;
        Yu == t && (Yu = n, Zu());
        var o = e[Ft],
            u = o.x,
            a = o.y,
            l = o.z;
        u == s && (u = 0), a == s && (a = 9.81), l == s && (l = 0);
        var c = e.acceleration;
        if (c) {
            var h = c.x,
                p = c.y,
                d = c.z;
            h == s && (h = 0), p == s && (p = 0), d == s && (d = 0), u -= h, a -= p, l -= d
        }
        if (Dr.ios || Dr.ie) u *= -1, a *= -1, l *= -1;
        var v = e.rotationRate,
            m = v.alpha,
            g = v.beta,
            y = v.gamma;
        m == s && (m = 0), g == s && (g = 0), y == s && (y = 0);
        if (Dr.ios || Dr[rt] || Dr.ie) {
            m *= ji, g *= ji, y *= ji;
            if (Dr.ie) {
                var b = m,
                    w = g,
                    E = y;
                m = w, g = E, y = b
            }
        }
        Ta ? Oa(i, m, g, y) : Kr && mu(m, g, y, r);
        var S = Na;
        m -= S.rx, g -= S.ry, y -= S.rz, So(au, u, a, l), na(au, i), uu = r, So(fu, m, g, y), ia(fu, r);
        if (fi <= 3 || fi == 5) ro.q.x = io.q.x, ro.q.y = io.q.y, ro.q.z = io.q.z, ro.q.w = io.q.w, ro.t = io.t, vu(io.q), io.t = r
    }

    function Zu() {
        Po(_u), Po(Du), Do(Hu), Ho(Hu, Ju), Do(Pu), Ho(Pu, 1), Do(Iu), Ho(Iu, Ku), Do(ju), Do(Bu), Do(Fu), To(Cu), To(Tu), To(xu), To(Nu), To(Su), So(Eu, 0, 0, Qu), bu = t
    }

    function ea(e, t) {
        Wo(e, Eu, xu), tu(xu, Tu, $u), ru($u, t)
    }

    function ta() {
        jo(Du, Xu), zo(Hu, Xu, Vu), zo(Du, Vu, Hu), Po(Du)
    }

    function na(e, t) {
        xo(Tu, e);
        if (bu) {
            ea(_u, Cu), t < 5 && (t = 5);
            var r = 1e3 / 60 / t,
                i = Gu * r,
                s = 1 / Gu,
                o = ku;
            for (var u = 0; u < 3; u++) To(o), No(o, u, s), nu(o, qu), zo(qu, _u, Ru), ea(Ru, Lu), Ao(Cu, Lu, Au), Lo(Au, i), Fo(Bu, u, Au);
            jo(Bu, Uu), zo(Hu, Uu, zu), zo(Bu, zu, Wu), Xo(Wu, Iu, ju), qo(ju, Uu), jo(Bu, zu), zo(zu, Uu, Wu), zo(Hu, Wu, Fu), Wo(Fu, Cu, Su), zo(Fu, Bu, Uu), Po(zu), Ro(zu, Uu), zo(zu, Hu, Uu), Io(Hu, Uu), nu(Su, Du), zo(Du, _u, _u), ta()
        } else tu(Eu, Tu, _u), bu = n
    }

    function ia(e, t) {
        if (ra != 0) {
            var n = (t - ra) / 1e3;
            n > 1 && (n = 1), xo(Nu, e), Lo(Nu, -n), nu(Nu, Du), Io(Ou, _u), zo(Du, _u, Ou), Io(_u, Ou), ta(), Io(Mu, Pu), Bo(Mu, n * n), Uo(Hu, Mu)
        }
        ra = t, xo(wu, e)
    }

    function sa() {
        return _u
    }

    function fa(e) {
        var t = oa;
        xo(t, wu), Lo(t, -e);
        var n = ua;
        nu(t, n);
        var r = aa;
        return zo(n, _u, r), r
    }

    function ma(e) {
        var t = e[p]("://");
        if (t > 0) {
            var n = e[p]("/", t + 3),
                r = e[zt](0, t)[h](),
                i = e[zt](t + 3, n),
                o = e[zt](n);
            return [r, i, o]
        }
        return s
    }

    function ga(e) {
        // if (ha == s) {
        //     var r = ma(la),
        //         i = ma(window[Or].href),
        //         u = i[0];
        //     if (u == "http" || u == "https") {
        //         if (Dr.ie || Dr.edge) u = "https";
        //         pa = u + "://" + r[1], da = pa + r[2];
        //         var a = document[Cr]("iframe");
        //         a.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;visibility:hidden;", bb[E][q].appendChild(a), ha = a, a[o]("load", function() {
        //             ca = n, e(ha)
        //         }, t), window[o]("message", ba, t), a.src = da
        //     }
        // } else ca && e(ha)
    }

    function ya(e) {
        ga(function(t) {
            // try {
            //     t.contentWindow.postMessage(e, pa)
            // } catch (n) {}
        })
    }

    function ba(e) {
        if (e.origin == pa) {
            var t = "" + e.data;
            t[zt](0, 15) == "webvr_settings:" && wa(t[zt](15))
        }
    }

    function wa(e) {
        var t = e[tn](nn),
            r = Number(t[0]),
            i = Number(t[1]),
            s = Number(t[2]),
            o = Number(t[3]),
            u = Number(t[4]),
            a = Number(t[5]),
            f = Number(t[6]),
            l = Number(t[7]),
            c = Number(t[8]),
            h = Number(t[9]),
            p = "" + t[10],
            d = Number(t[11]);
        isNaN(f) && (f = 0), isNaN(l) && (l = 0), isNaN(c) && (c = 0), isNaN(h) && (h = 1), isNaN(d) && (d = 0), p[tn]("|")[Kt] != 4 && (p = $n), !isNaN(r) && r >= 30 && r < 90 && !isNaN(i) && i >= 0 && i < 12 && !isNaN(s) && s >= 1 && s < 180 && !isNaN(o) && o >= 0 && o < 10 && !isNaN(u) && u >= 1 && u < 500 && !isNaN(a) && a >= 0 && a < 10 && !isNaN(h) && h > 0 && h < 2 && (Gr = r, Yr = i, ei = s, ti = o, oi = u, fi = a, Na.rx = f, Na.ry = l, Na.rz = c, Zr = h, ni = p, si = d, wi = n)
    }

    function Ea(e) {
        var n = ("" + e)[h]() != "local";
        if (Dr[rt] || Dr.ios || Dr.safari || Dr[w]) n = t;
        return n
    }

    function Sa(e) {
        if (gi || bi) {
            if (va) try {
                var t = window.localStorage;
                if (t) {
                    var n = t[ar](bn);
                    n || (n = t[ar](Nn)), n || (n = t[ar](xn)), n || (n = t[ar](kn)), n && wa(n)
                }
            } catch (r) {}
            Ea(e) && ya("load.4")
        }
    }

    function xa(e) {
        if (gi || bi) {
            var n = Gr + nn + Yr + nn + ei + nn + ti + nn + oi + nn + fi + nn + Na.rx + nn + Na.ry + nn + Na.rz + nn + Zr + nn + ni + nn + si;
            if (va) try {
                var r = window.localStorage;
                r && (r[lr](bn, n), r[lr](Nn, n[tn](nn)[zt](0, 10).join(nn)), r[lr](xn, n[tn](nn)[zt](0, 9).join(nn)), r[lr](kn, n[tn](nn)[zt](0, 6).join(nn)))
            } catch (i) {}
            var s = ("" + e)[h]() != "local";
            if (Dr[rt] || Dr.ios) s = t;
            Ea(e) && ya("save.4:" + n)
        }
    }

    function La(e, r) {
        vi && gi && !yi && (Ta = n, Kr = t, Ca = e, ka = r, Oa(-1))
    }

    function Aa() {
        Ta = t, Na.rx = 0, Na.ry = 0, Na.rz = 0
    }
    var e = "registerattribute",
        t = !1,
        n = !0,
        r = "removeEventListener",
        s = null,
        o = "addEventListener",
        u = "view",
        a = "fullscreenchange",
        f = "enabled",
        l = "onunavailable",
        c = "browser",
        h = "toLowerCase",
        p = "indexOf",
        d = "orientation",
        v = "deviceorientation",
        m = "events",
        g = "architectural",
        y = "getEyeParameters",
        b = "maxpixelzoom",
        w = "desktop",
        E = "display",
        S = "fisheyefovlink",
        x = "control",
        T = "LG G4",
        N = "LG G4 Stylus",
        C = "devicemotion",
        k = "stereographic",
        L = "continuousupdates",
        A = "android",
        O = "hlookat",
        M = "getRecommendedEyeRenderRect",
        _ = "limitview",
        D = "Xperia C4",
        P = "LG G Flex 2",
        H = "area",
        B = "LG G3",
        j = "getCurrentEyeFieldOfView",
        F = "height",
        I = "onavailable",
        q = "viewerlayer",
        R = "webkitFullscreenElement",
        U = "mousedown",
        z = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n",
        W = "OnePlus One",
        X = "loadwhilemoving",
        V = "capabilities",
        $ = "isPresenting",
        J = "renderRect",
        K = "mozFullScreenElement",
        Q = "haschanged",
        G = "right",
        Y = "Zenfone 2 Laser",
        Z = "HTC One M8",
        et = "LG V10",
        tt = "call",
        nt = "float r = texture2D(sm,vR).r;",
        rt = "firefox",
        it = "pannini",
        st = "fovtype",
        ot = "msFullscreenElement",
        ut = "fisheye",
        at = "float b = texture2D(sm,vB).b;",
        ft = "downloadlockedlevel",
        lt = "Xperia Z Ultra",
        ct = "mousemove",
        ht = "webkitIsFullScreen",
        pt = "getRecommendedRenderTargetSize",
        dt = "Xperia C5",
        vt = "stereooverlap",
        mt = "userAgent",
        gt = "fullscreen",
        yt = "Xperia Z1",
        bt = "Xperia M5",
        wt = "Xperia Z3",
        Et = "uniform1f",
        St = "timertick",
        xt = "Galaxy S5",
        Tt = "width",
        Nt = "vec2 vR = center + v * ca;",
        Ct = "precision mediump float;\n",
        kt = "layer",
        Lt = "renderTargetSize",
        At = "vec2 vB = center + v / ca;",
        Ot = "getEyeTranslation",
        Mt = "lockmultireslevel",
        _t = "documentElement",
        Dt = "fullscreenElement",
        Pt = "#endif\n",
        Ht = "precision highp float;\n",
        Bt = "left",
        jt = "atan2",
        Ft = "accelerationIncludingGravity",
        It = "uniform sampler2D sm;",
        qt = "usercontrol",
        Rt = "vec2 v = tx - center;",
        Ut = "scaleflying",
        zt = "slice",
        Wt = "LG G3 S",
        Xt = "fovmax",
        Vt = "fovmin",
        $t = "HTC One M9",
        Jt = "landscape",
        Kt = "length",
        Qt = "useProgram",
        Gt = "LG G Flex",
        Yt = "Moto X",
        Zt = "auto",
        en = "vlookat",
        tn = "split",
        nn = ",",
        rn = "uniform float ol;",
        sn = "uniform float ca;",
        on = "Xperia Z3 Compact",
        un = "recommendedFieldOfView",
        an = "LG Optimus G Pro",
        fn = "varying vec2 tx;",
        ln = "LG Magna",
        cn = "mousetype",
        hn = "mobile",
        pn = "YXZ",
        dn = "LG G2",
        vn = "mozPointerLockElement",
        mn = "distorted",
        gn = "onunknowndevice",
        yn = "HTC Desire 728",
        bn = "krpano.webvr.4",
        wn = "Zenfone Selfie",
        En = "webGL",
        Sn = "sqrt",
        xn = "krpano.webvr.2",
        Tn = "mozUnlockOrientation",
        Nn = "krpano.webvr.3",
        Cn = "HTC Desire 626",
        kn = "krpano.webvr.1",
        Ln = "#ifdef GL_ES\n",
        An = "camroll",
        On = "visible",
        Mn = "contextmenu",
        _n = "mozLockOrientation",
        Dn = "Zenfone Zoom",
        Pn = "stereo",
        Hn = "hasExternalDisplay",
        Bn = "mozGetVRDevices",
        jn = "pointerLockElement",
        Fn = "Moto X Play",
        In = "unlockOrientation",
        qn = "touchstart",
        Rn = "HTC One M9+",
        Un = "_VR_backup",
        zn = "void main()",
        Wn = "getVRDisplays",
        Xn = "HTC One E9",
        Vn = "LG G5",
        $n = "1|0|0|0",
        Jn = "HTC One A9",
        Kn = "HTC One E8",
        Qn = "devicename",
        Gn = "off",
        Yn = "Xperia Z5",
        Zn = "Galaxy S3",
        er = "Galaxy S4",
        tr = "Galaxy A3",
        nr = "Galaxy A5",
        rr = "Galaxy A7",
        ir = "maxmem",
        sr = "iPhone 6+",
        or = "LG Spirit",
        ur = "touchmove",
        ar = "getItem",
        fr = "lockOrientation",
        lr = "setItem",
        cr = "Nexus 5X",
        hr = "createppshader",
        pr = "VFOV",
        dr = "Honor 6+",
        vr = "hotspot[",
        mr = "hardwareUnitId",
        gr = "Honor 4X",
        yr = "eyeTranslation",
        br = "mozOrientation",
        wr = "iPhone 6",
        Er = "screentosphere",
        Sr = "changedTouches",
        xr = "touchend",
        Tr = "HTC One",
        Nr = "keydown",
        Cr = "createElement",
        kr = "#else\n",
        Lr = "Honor 7",
        Ar = "Unknown",
        Or = "location",
        Mr = this;
    Mr.name = "WebVR", Mr.version = "1.19-pr8", Mr.build = "2016-09-30";
    var bb = s,
        Dr = s,
        Pr = s,
        Hr = document,
        Br = 1,
        jr = .00125,
        Fr = t,
        Ir = n,
        qr = 0,
        Rr = n,
        Ur = 1,
        zr = n,
        Wr = n,
        Xr = t,
        Vr = t,
        $r = n,
        Jr = n,
        Kr = t,
        Qr = t,
        Gr = 63.5,
        Yr = Zt,
        Zr = 1,
        ei = 96,
        ti = .6,
        ni = $n,
        ri = [1, 0, 0, 0],
        ii = t,
        si = 0,
        oi = 100,
        ui = t,
        ai = 1,
        fi = 3,
        li = "",
        ci = n,
        hi = s,
        pi = s,
        di = s,
        vi = t,
        mi = t,
        gi = t,
        yi = t,
        bi = t,
        wi = t,
        Ei = t,
        Si = t,
        xi = t,
        Ti = {
            enabled: t,
            eyetranslt: mo,
            requestframe: ho,
            updateview: lo,
            submitframe: po,
            prjmatrix: vo,
            getsize: go,
            getcursor: wo,
            setoffset: ks,
            resetsensor: Ls
        },
        Ni = n,
        Ci = 0,
        ki = 0,
        Li = 6,
        Ai = 0,
        Oi = 1,
        Mi = 0,
        _i = 0,
        Di = 0,
        Pi = t,
        Hi = s,
        Bi = s,
        ji = Math.PI / 180,
        Fi = 180 / Math.PI;
    Mr.registerplugin = function(r, i, o) {
        bb = r, Pr = o;
        if (bb.version < "1.19" || bb.build < "2015-07-09") {
            bb.trace(3, "WebVR plugin - too old krpano version (min. 1.19)");
            return
        }
        if (bb.webVR) return;
        Dr = bb.device, ("" + navigator[mt])[h]()[p]("mobile vr") >= 0 && (Ei = n, ui = n), Pr[e]("worldscale", Br, function(e) {
            var t = Number(e);
            isNaN(t) || (Br = Math.max(t, .1))
        }, function() {
            return Br
        }), Pr[e]("mousespeed", jr, function(e) {
            var t = Number(e);
            isNaN(t) || (jr = t)
        }, function() {
            return jr
        }), Pr[e]("headtracking", Ir, function(e) {
            var r = Ii(e);
            if (r != Ir)
                if (r == t) Ir = t;
                else {
                    Ir = n;
                    var i = bb[u][O];
                    bb[u][O] = qr, ks(i)
                }
        }, function() {
            return Ir
        }), Pr[e]("pos_tracking", Fr, function(e) {
            Fr = Ii(e)
        }, function() {
            return Fr
        }), Pr[e]("multireslock", Rr, function(e) {
            Rr = Ii(e), Ti[f] && Ms()
        }, function() {
            return Rr
        }), Pr[e]("oversampling", Ur, function(e) {
            Ur = Number(e), bb[H][Q] = n
        }, function() {
            return Ur
        }), Pr[e]("fullscreen_mirroring", zr, function(e) {
            zr = Ii(e)
        }, function() {
            return zr
        }), Pr[e]("mobilevr_support", Wr, function(e) {
            Wr = Ii(e)
        }, function() {
            return Wr
        }), Pr[e]("mobilevr_touch_support", Xr, function(e) {
            Xr = Ii(e)
        }, function() {
            return Xr
        }), Pr[e]("mobilevr_fake_support", Vr, function(e) {
            Vr = Ii(e)
        }, function() {
            return Vr
        }), Pr[e]("mobilevr_ipd", Gr, function(e) {
            var t = Number(e);
            isNaN(t) || (Gr = t), ps()
        }, function() {
            return Gr
        }), Pr[e]("mobilevr_screensize", Yr, function(e) {
            bs(e)
        }, function() {
            return ws()
        }), Pr[e]("mobilevr_lens_fov", ei, function(e) {
            var t = Number(e);
            isNaN(t) || (ei = t, ps())
        }, function() {
            return ei
        }), Pr[e]("mobilevr_lens_overlap", Zr, function(e) {
            var t = Number(e);
            isNaN(t) || (Zr = t, ps())
        }, function() {
            return Zr
        }), Pr[e]("mobilevr_lens_dist", ti, function(e) {
            var t = Number(e);
            isNaN(t) || (ti = t, ps())
        }, function() {
            return ti
        }), Pr[e]("mobilevr_lens_dist2", ni, function(e) {
            ni = e, ps()
        }, function() {
            return ni
        }), Pr[e]("mobilevr_lens_ca", si, function(e) {
            var t = Number(e);
            isNaN(t) || (si = t, ps())
        }, function() {
            return si
        }), Pr[e]("mobilevr_lens_vign", oi, function(e) {
            var t = Number(e);
            isNaN(t) || (oi = t, ps())
        }, function() {
            return oi
        }), Pr[e]("mobilevr_webvr_dist", ui, function(e) {
            ui = Ii(e)
        }, function() {
            return ui
        }), Pr[e]("mobilevr_wakelock", $r, function(e) {
            $r = Ii(e)
        }, function() {
            return $r
        }), Pr[e]("mobilevr_orientationlock", Jr, function(e) {
            Jr = Ii(e)
        }, function() {
            return Jr
        }), Pr[e]("mobilevr_autocalibration", Kr, function(e) {
            Kr = Ii(e)
        }, function() {
            return Kr
        }), Pr[e]("mobilevr_webvr_firefox", Qr, function(e) {
            Qr = Ii(e)
        }, function() {
            return Qr
        }), Pr[e]("mobilevr_sensor", ai, function(e) {
            ai = parseInt(e) & 1
        }, function() {
            return ai
        }), Pr[e]("mobilevr_sensor_mode", fi, function(e) {
            var t = parseInt(e);
            t >= 0 && t <= 7 && (fi = t), ki = 0
        }, function() {
            return fi
        }), Pr[e]("vr_cursor", li, function(e) {
            yo(e)
        }, function() {
            return li
        }), Pr[e]("vr_cursor_enabled", ci, function(e) {
            ci = Ii(e)
        }, function() {
            return ci
        }), Pr[e]("vr_cursor_onover", pi, function(e) {
            pi = e
        }, function() {
            return pi
        }), Pr[e]("vr_cursor_onout", di, function(e) {
            di = e
        }, function() {
            return di
        }), Pr[e]("isavailable", mi, function(e) {}, function() {
            return mi
        }), Pr[e]("isenabled", vi, function(e) {}, function() {
            return vi
        }), Pr[e]("iswebvr", !gi, function(e) {}, function() {
            return !gi || bi
        }), Pr[e]("ismobilevr", gi, function(e) {}, function() {
            return gi || bi
        }), Pr[e]("isfake", yi, function(e) {}, function() {
            return yi
        }), Pr[e]("havesettings", wi, function(e) {}, function() {
            return wi
        }), Pr[e](Qn, "", function(e) {}, function() {
            return gs()
        }), Pr[e]("devicesize", "", function(e) {}, function() {
            return ys()
        }), Pr[e](I, s), Pr[e](l, s), Pr[e](gn, s), Pr[e]("onentervr", s), Pr[e]("onexitvr", s), Pr.entervr = xs, Pr.exitvr = Ns, Pr.togglevr = Cs, Pr.resetsensor = Ls, Pr.lookat = ks, Pr.loadsettings = Sa, Pr.savesettings = xa, Pr.calibrate = La, Pr.resetcalibration = Aa, Pr.update = Ss;
        if (bb[En]) {
            bb.webVR = Ti;
            var a = t;
            Dr[A] && Dr[rt] && Qr == t && (a = n);
            var c = document[_t].requestPointerLock || document[_t].mozRequestPointerLock || document[_t].webkitRequestPointerLock,
                d = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
            c && d && (Pi = n, Hi = c, Bi = d);
            try {
                a == t && navigator[Wn] ? navigator[Wn]().then(rs) : a == t && navigator.getVRDevices ? navigator.getVRDevices().then(us) : a == t && navigator[Bn] ? navigator[Bn](us) : Wr ? Ri() : Si == t && (Si = n, bb[tt](Pr[l], Pr))
            } catch (v) {}
        } else Si == t && (Si = n, bb[tt](Pr[l], Pr))
    }, Mr.unloadplugin = function() {
        Ns(), Ps(t, n), Hr[r](Dr[c][m][a], Is), bb[x][kt][r](U, js, t), bb.webVR = s
    };
    var bc = s,
        Vi = s,
        $i = s,
        Ji = s,
        Ki = s,
        Qi = s,
        Gi = s,
        Yi = s,
        Zi = s,
        es = s,
        ts = s,
        ns = 100,
        as = s,
        ls = s,
        As = s,
        Ps = function() {
            var e = s,
                n = s;
            return function(r, i) {
                if (Dr[hn] && yi == t)
                    if (r)
                        if (Dr.ios) {
                            var o = 15;
                            e = window.setInterval(function() {
                                var e = ("" + window[Or].href)[tn]("#")[0];
                                window[Or].ref = e, window.setTimeout(window.stop, 0), window.setTimeout(bb.Kloader.iOSWakelockCheck, 1)
                            }, o * 1e3)
                        } else Dr[A] && (n == s && (n = document[Cr]("video"), n.setAttribute("loop", ""), n.canPlayType("video/webm") != "" && (n.src = _a)), n.play());
                    else {
                        e && (window.clearInterval(e), e = s);
                        if (n && i) {
                            n.pause();
                            try {
                                n.src = "", n.removeAttribute("src")
                            } catch (u) {}
                            n = s
                        }
                    }
            }
        }(),
        Bs = 0,
        qs = 0,
        Rs = 0,
        ro = {
            q: new zs(0, 0, 0, 1),
            t: 0
        },
        io = {
            q: new zs(0, 0, 0, 1),
            t: 0
        },
        so = new zs(0, 0, 0, 1),
        oo = s,
        ao = s,
        fo = new zs(0, 0, 0, 1),
        Vo = new Eo,
        $o = new Eo,
        Jo = new Eo,
        Ko = new Eo,
        Qo = new Eo,
        Go = _o(),
        Yo = _o(),
        Zo = new Eo,
        eu = new Eo,
        uu = 0,
        au = new Eo,
        fu = new Eo,
        lu = s,
        cu = _o(),
        hu = _o(),
        pu = _o(),
        du = _o(),
        mu = function() {
            var e = 0,
                t = 0,
                n = 0,
                r = 0,
                i = 0,
                s = 0,
                o = 0,
                u = 0,
                a = 0,
                f = 0,
                l = 1,
                c = 0,
                h = 0,
                p = 0,
                d = .03;
            return function(c, h, p, v) {
                var m = c - e,
                    g = h - t,
                    y = p - n,
                    b = v - r;
                e = c, t = h, n = p, r = v;
                var w = Math[Sn](m * m + g * g + y * y);
                if (b > 500) {
                    i = 0;
                    return
                }
                if (i == 0) {
                    i = b, s = w;
                    return
                }
                i = i * .95 + .05 * b;
                var E = Math.min(15 * i / 1e3, .5);
                s = s * (1 - E) + E * w;
                var S = Na;
                s < d ? (o++, u += c, a += h, f += p, o > 19 && (S.rx = S.rx * (1 - l) + l * (u / o), S.ry = S.ry * (1 - l) + l * (a / o), S.rz = S.rz * (1 - l) + l * (f / o), l > .5 && (l *= .9), s = 10, d *= .5)) : (o = 1, u = c, a = h, f = p)
            }
        }(),
        gu = 0,
        bu = t,
        wu = new Eo,
        Eu = new Eo,
        Su = new Eo,
        xu = new Eo,
        Tu = new Eo,
        Nu = new Eo,
        Cu = new Eo,
        ku = new Eo,
        Lu = new Eo,
        Au = new Eo,
        Ou = _o(),
        Mu = _o(),
        _u = _o(),
        Du = _o(),
        Pu = _o(),
        Hu = _o(),
        Bu = _o(),
        ju = _o(),
        Fu = _o(),
        Iu = _o(),
        qu = _o(),
        Ru = _o(),
        Uu = _o(),
        zu = _o(),
        Wu = _o(),
        Xu = _o(),
        Vu = _o(),
        $u = _o(),
        Ju = 20,
        Ku = .5,
        Qu = 9.81,
        Gu = 1e7,
        Yu = t,
        ra = 0,
        oa = new Eo,
        ua = _o(),
        aa = _o(),
        la = "https://www.aoliliya.com",
        ca = t,
        ha = s,
        pa = s,
        da = s,
        va = n,
        Ta = t,
        Na = {
            rx: 0,
            ry: 0,
            rz: 0
        },
        Ca = s,
        ka = s,
        Oa = function() {
            function i() {
                var t = 0,
                    r = n * 3,
                    i = 0,
                    s = 0,
                    o = 0,
                    u = 0,
                    a = 0,
                    f = 0,
                    l = 0,
                    c = 0,
                    h = 0,
                    p = 0;
                for (t = 0; t < r; t += 3) i += e[t | 0], s += e[t + 1 | 0], o += e[t + 2 | 0];
                i /= n, s /= n, o /= n;
                for (t = 0; t < r; t += 3) l = e[t | 0] - i, c = e[t + 1 | 0] - s, h = e[t + 2 | 0] - o, u += l * l, a += c * c, f += h * h;
                u = Math[Sn](u / n), a = Math[Sn](a / n), f = Math[Sn](f / n), p = Math[Sn](u * u + a * a + f * f);
                if (p < .05) {
                    var d = Na;
                    d.rx = i, d.ry = s, d.rz = o, Ca && bb[tt](Ca, Pr)
                } else ka && bb[tt](ka, Pr)
            }
            var e = new Array(300),
                n = 0,
                r = 0;
            return function(s, o, u, a) {
                if (s < 0) {
                    n = 0, r = bb[St];
                    return
                }
                var f = bb[St] - r;
                if (f > 500) {
                    var l = n * 3;
                    e[l | 0] = o, e[l + 1 | 0] = u, e[l + 2 | 0] = a, n++;
                    if (n > 100 || f > 2500) Ta = t, i()
                }
            }
        }(),
        Ma = function() {
            function u(t) {
                for (i = 0; i < t[Kt]; i++)
                    if (e && t[i] === e || r && t[i] === r) t.splice(i, 1), i--
            }
            var e = s,
                n = "" + Ln + z + Ht + kr + Ct + Pt + Pt + It + fn + sn + rn + zn + "{" + "float g = texture2D(sm,tx).g;" + "vec2 center = vec2(0.5 + (0.5 - ol)*(step(0.5,tx.x) - 0.5), 0.5);" + Rt + Nt + nt + At + at + "gl_FragColor=vec4(r,g,b,1.0);" + "}",
                r = s,
                o = "" + Ln + z + Ht + kr + Ct + Pt + Pt + It + fn + "uniform vec2 sz;" + "uniform float ss;" + sn + rn + "uniform float vg;" + "uniform vec4 dd;" + zn + "{" + "float vig = 0.015;" + "float side = step(0.5,tx.x) - 0.5;" + "float aspect = (sz.x / sz.y);" + "vec2 center = vec2(0.5 + (0.5 - ol)*side, 0.5);" + Rt + "v.x = v.x * aspect;" + "v *= 2.0 * ss;" + "float rs = dot(v,v);" + "v = v * (dd.x + rs*(dd.y + rs*(dd.z + rs*dd.w)));" + "v /= 2.0 * ss;" + "v.x = v.x / aspect;" + "vec2 vG = center + v;" + "float a = (1.0 - smoothstep(vG.x-vig - side*ol, vG.x - side*ol, center.x - 0.25)) * " + "(1.0 - smoothstep(center.x + 0.25 - vG.x + side*ol - vig, center.x + 0.25 - vG.x + side*ol, 0.0)) * " + "(1.0 - smoothstep(vG.y-vig, vG.y, 0.0)) * " + "(1.0 - smoothstep(1.0 - vG.y-vig,1.0 - vG.y, 0.0));" + "a *= smoothstep(rs-vig, rs+vig, vg);" + Nt + At + nt + "float g = texture2D(sm,vG).g;" + at + "gl_FragColor=vec4(a*r,a*g,a*b,1.0);" + "}";
            return function(i) {
                var a = bb[En];
                if (a) {
                    var f, l = a.context,
                        c = a.ppshaders,
                        h = 1 - si * .1 / Oi;
                    ii == t && h > .999999 && h < 1.000001 && (i = t), bb[E][Pn] == t && (i = t);
                    if (i)
                        if (ii) {
                            r == s && (r = a[hr](o, "ss,ca,dd,ol,sz,vg"));
                            if (r) {
                                var p = 1 / ri[0],
                                    d = ri[1],
                                    v = ri[2],
                                    m = ri[3];
                                a[Qt](r.prg), l[Et](r.ss, Oi), l[Et](r.ca, h), l.uniform4f(r.dd, p, p * d, p * v, p * m), l[Et](r.ol, .5 * Di * (1 + (Zr - 1) * .1)), l[Et](r.vg, oi / 30), a[Qt](s), u(c), c.push(r)
                            }
                        } else e == s && (e = a[hr](n, "ca,ol")), e && (a[Qt](e.prg), l[Et](e.ca, h), l[Et](e.ol, .5 * Di * (1 + (Zr - 1) * .1)), a[Qt](s), u(c), c.push(e));
                    else u(c)
                }
            }
        }(),
        _a = "data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8oEEQvOBCEKChHdlYm1Ch4ECQoWBAhhTgGcBAAAAAAABzRFNm3RALE27i1OrhBVJqWZTrIHfTbuMU6uEFlSua1OsggEuTbuMU6uEHFO7a1OsggGw7AEAAAAAAACkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmAQAAAAAAAEMq17GDD0JATYCMTGF2ZjU2LjMuMTAwV0GMTGF2ZjU2LjMuMTAwc6SQC+JFWnEfyt4nOD98NcnLDESJiAAAAAAAAAAAFlSuawEAAAAAAABCrgEAAAAAAAA514EBc8WBAZyBACK1nIN1bmSGhVZfVlA4g4EBI+ODgw9CQOABAAAAAAAADrCBCLqBCFSwgQhUuoEIH0O2dQEAAAAAAAAo54EAo6OBAACAEAIAnQEqCAAIAABHCIWFiIWEiAICAAwNYAD+/6PeABxTu2sBAAAAAAAAEbuPs4EAt4r3gQHxggF88IED"
};