import Core from "smooothy"
import gsap from "gsap"

export default class LinkKeyboardSlider extends Core {
    constructor(container: HTMLElement, config = {}) {
        const slider = container.querySelector("[data-slider]");
      
        if (!slider) {
          throw new Error("Element with [data-slider] not found in container.");
        }
      
        // Explicitly cast to HTMLElement
        super(slider as HTMLElement);
      
        if (typeof this.update !== "function") {
          throw new Error("Method 'update' is not defined.");
        }
      
        gsap.ticker.add(this.update.bind(this));
      
        this.addKeyboardEvents();
        this.captureLinkClicks();
      }
      
      

  addKeyboardEvents() {
    window.addEventListener("keydown", (e) => {
      if (!this.isVisible) return

      if (/^[0-9]$/.test(e.key)) {
        const slideIndex = parseInt(e.key)
        if (this.config.infinite || slideIndex < this.items.length) {
          this.goToIndex(slideIndex)
        }
        return
      }

      switch (e.key) {
        case "ArrowLeft":
          this.goToPrev()
          break
        case "ArrowRight":
        case " ":
          this.goToNext()
          break
      }
    })
  }

  captureLinkClicks() {
    [...this.wrapper.querySelectorAll("a")].forEach((link) => {
      let startX = 0
      let startY = 0
      let startTime = 0
      let isDragging = false

      link.style.pointerEvents = "none"

      const handleMouseDown = (e: MouseEvent) => {
        startX = e.clientX
        startY = e.clientY
        startTime = Date.now()
        isDragging = false
      }

      const handleMouseMove = (e: MouseEvent) => {
        const dx = Math.abs(e.clientX - startX)
        const dy = Math.abs(e.clientY - startY)
        if (dx > 5 || dy > 5) isDragging = true
      }

      const handleMouseUp = () => {
        if (!isDragging && Date.now() - startTime < 200) {
          link.click()
        }
        startTime = 0
        isDragging = false
      }

      link.parentElement?.addEventListener("mousedown", handleMouseDown)
      link.parentElement?.addEventListener("mousemove", handleMouseMove)
      link.parentElement?.addEventListener("mouseup", handleMouseUp)
    })
  }
}
