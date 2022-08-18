import { useEffect, useState } from "react";

// const OPTIONS = {
//     root : null,
//     threshold : 1
// }

export const useIsVisible = (targetElement : any, threshold : number) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if(targetElement.current){
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    // if(entry.isIntersecting) {
                    //     setIsVisible(true);
                    //     observer.unobserve(targetElement.current);
                    // }
                    // else { 
                    //     setIsVisible(false);
                    // }
                    setIsVisible(entry.isIntersecting);
                });
            },{
                root : null,
                threshold : threshold
            });
            observer.observe(targetElement.current);
        }
    },[targetElement,threshold]);
    return isVisible;
}