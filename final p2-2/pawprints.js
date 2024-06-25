document.addEventListener('DOMContentLoaded', () => {
    let lastPrintTime = 0;
    const printInterval = 100; // Interval in milliseconds between paw prints
    let lastX = null;
    let lastY = null;
    let isLeft = true; // To alternate between left and right paw prints

    document.body.addEventListener('mousemove', (event) => {
        const currentTime = Date.now();
        if (currentTime - lastPrintTime > printInterval) {
            if (lastX !== null && lastY !== null) {
                const angle = Math.atan2(event.pageY - lastY, event.pageX - lastX) * 180 / Math.PI;
                createPawPrint(event.pageX, event.pageY, angle, isLeft);
                isLeft = !isLeft; // Toggle between left and right
            }
            lastX = event.pageX;
            lastY = event.pageY;
            lastPrintTime = currentTime;
        }
    });
});

function createPawPrint(x, y, angle, isLeft) {
    const offset = 10; // Offset for the paw prints
    const radian = angle * Math.PI / 180;
    const offsetX = Math.sin(radian) * offset * (isLeft ? -1 : 1);
    const offsetY = Math.cos(radian) * offset * (isLeft ? 1 : -1);
   
    const pawPrint = document.createElement('div');
    pawPrint.className = `paw-print ${isLeft ? 'left' : 'right'}`;
    pawPrint.style.left = `${x + offsetX}px`;
    pawPrint.style.top = `${y + offsetY}px`;
    pawPrint.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    document.body.appendChild(pawPrint);

    setTimeout(() => {
        pawPrint.remove();
    }, 2000);
}