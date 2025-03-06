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
    // Update previous state before changing
    previousStateRef.current = enabled;

    // Update state
    setEnabled(!enabled);

    // Increment toggle count
    toggleCountRef.current += 1;

    // Save to localStorage
    localStorage.setItem("toggleState", JSON.stringify(!enabled));

    // Log changes
    console.log("Previous state:", previousStateRef.current);
    console.log("New state:", !enabled);
    console.log("Toggle count:", toggleCountRef.current);

    // Apply scale animation
    if (switchRef.current) {
      switchRef.current.style.transform = "scale(1.1)";
      setTimeout(() => {
        if (switchRef.current) {
          switchRef.current.style.transform = "scale(1)";
        }
      }, 200);
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={enabled}
          onChange={handleToggle}
          ref={switchRef}
          className={classNames(
            enabled ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          )}
          style={{ transition: "transform 0.2s ease-in-out" }}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">Yıllık fatura</span>{" "}
          <span className="text-gray-500">(%10 Tasarruf Edin)</span>
        </Switch.Label>
      </Switch.Group>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
