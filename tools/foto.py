"""Proje fotoğraflarını webp'ye çevirir: python3 tools/foto.py <kaynak-klasör>

Kaynak klasör, projeler.py'deki her fotoğrafın "kaynak" yolunu içermeli.
Çıktı: public/assets/projeler/<proje>/<ad>-<genişlik>.webp (800 ve 1600 px; kaynak daha küçükse yalnızca kendi boyunda).
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

sys.path.insert(0, str(Path(__file__).resolve().parent))
from projeler import GENISLIKLER, PROJELER  # noqa: E402

OUT = Path(__file__).resolve().parent.parent / "public" / "assets" / "projeler"


def main(src):
    src = Path(src)
    for p in PROJELER:
        for f in p["fotolar"]:
            im = ImageOps.exif_transpose(Image.open(src / f["kaynak"])).convert("RGB")
            d = OUT / p["slug"]
            d.mkdir(parents=True, exist_ok=True)
            for w in GENISLIKLER:
                ww = min(w, im.width)
                out = im.resize((ww, round(im.height * ww / im.width)), Image.LANCZOS) if ww < im.width else im
                out.save(d / f"{f['ad']}-{w}.webp", "WEBP", quality=80, method=6)
                if ww == im.width:  # kaynak bu boydan küçük: büyüğünü üretme
                    break
            print(p["slug"], f["ad"], im.size)


if __name__ == "__main__":
    main(sys.argv[1])
