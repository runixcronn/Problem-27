import { Switch } from "@headlessui/react";
import { useRef, useEffect, useState } from "react";

// Aşağıdaki Toggle bileşeni aç/kapat anahtarı (switch) olarak çalışmaktadır.
// Ancak şu anda bazı eksiklikler ve iyileştirilmesi gereken noktalar bulunmaktadır.
// Amacınız useRef kullanarak bileşeni daha sağlam ve kontrollü hale getirmektir.

// ✅ useRef kullanarak bileşenin önceki durumunu saklayın ve console.log ile her değişimde eski ve yeni değeri yazdırın.
// ✅ Toggle değişimlerini takip etmek için useRef kullanarak bir sayaç oluşturun (kaç kere açılıp kapandığını takip edin).
// ✅ useRef ile bileşene odaklanmayı sağlayın. Toggle bileşeni ilk yüklendiğinde otomatik olarak odaklansın.
// ✅ Toggle durumunun son halini kaydetmek için bir useRef değişkeni oluşturun ve bileşen kapandığında son durumu localStorage’a kaydedin.
// ✅ useRef ile bir DOM referansı oluşturarak, toggle bileşenine her tıklandığında hafifçe büyümesini sağlayın (örn: scale animasyonu).

// Bonus:
// ✨ Toggle açık/kapalı durumunda bileşenin genişliğini değiştirin:
//    - Açıkken w-16, kapalıyken w-11 olacak şekilde dinamik genişlik ayarlayın.
// ✨ Toggle değiştiğinde ikon değişimi ekleyin:
//    - Açıkken bir "güneş" ikonu (🌞), kapalıyken bir "ay" ikonu (🌙) gösterin.
// ✨ Butona basıldığında küçük bir vibrate efekti ekleyin (animate-wiggle gibi özel Tailwind animasyonu oluşturun).
// ✨ Switch'in durumuna göre arkaplanına blur ve backdrop-filter efekti ekleyerek cam efekti verin (backdrop-blur-md gibi).
// ✨ Toggle butonuna "arka plan değişimi" efekti ekleyin:
//    - Buton kapalıysa mat renkler, açık olduğunda gradient bir arka plan oluşturun.
// ✨ Kullanıcının Tab tuşuyla navigasyon yapabilmesini sağlamak için Tailwind’in focus-visible özelliklerini kullanın.
// ✨ peer özelliğini kullanarak toggle açıkken yanında ekstra bir bilgi gösterecek şekilde geliştirin (örn: "Premium aktif")

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const previousStateRef = useRef(enabled);
  const toggleCountRef = useRef(0);
  const switchRef = useRef(null);
  const lastStateRef = useRef(enabled);

  useEffect(() => {
    if (switchRef.current) {
      switchRef.current.focus();
    }
  }, []);

  const handleToggle = () => {
    previousStateRef.current = enabled;
    setEnabled(!enabled);
    toggleCountRef.current += 1;
    localStorage.setItem("toggleState", JSON.stringify(!enabled));

    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    if (switchRef.current) {
      switchRef.current.style.transform = "scale(1.1)";
      setTimeout(() => {
        if (switchRef.current) {
          switchRef.current.style.transform = "scale(1)";
        }
      }, 200);
    }
    console.log("Previous state:", previousStateRef.current);
    console.log("Current state:", enabled);
    console.log("Toggle count:", toggleCountRef.current);
  };

  return (
    <div className="p-8 flex justify-center">
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={enabled}
          onChange={handleToggle}
          ref={switchRef}
          className={classNames(
            enabled ? "w-16" : "w-11",
            enabled
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 backdrop-blur-md backdrop-filter"
              : "bg-gray-200",
            isWiggling && "animate-wiggle",
            "relative inline-flex h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-9" : "translate-x-0",
              "pointer-events-none",
              "inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            )}
          >
            {enabled ? "🌞" : "🌙"}
          </span>
        </Switch>
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">Yıllık fatura</span>{" "}
          <span className="text-gray-500">(%10 Tasarruf Edin)</span>
          <span
            className={classNames(
              "transform transition-all duration-300",
              enabled ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
            )}
          >
            <span className="text-indigo-500 font-medium">
              {" "}
              - Premium aktif
            </span>
          </span>
        </Switch.Label>
      </Switch.Group>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
