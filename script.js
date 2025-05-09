const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let circles = [];
let selectedCircleIndex = null;
let isDragging = false;

canvas.addEventListener("mousedown", e => {
  const mouse = getMousePosition(e);
  selectedCircleIndex = getCircleAt(mouse.x, mouse.y);

  if (selectedCircleIndex !== null) {
    isDragging = true;
    circles.forEach(circle => circle.selected = false);
    circles[selectedCircleIndex].selected = true;
  } else {
    circles.forEach(circle => circle.selected = false);
    circles.push({ x: mouse.x, y: mouse.y, radius: 20, selected: true });
    selectedCircleIndex = circles.length - 1;
  }

  drawCircles();
});

canvas.addEventListener("mousemove", e => {
  if (isDragging && selectedCircleIndex !== null) {
    const mouse = getMousePosition(e);
    circles[selectedCircleIndex].x = mouse.x;
    circles[selectedCircleIndex].y = mouse.y;
    drawCircles();
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

canvas.addEventListener("wheel", e => {
  if (selectedCircleIndex !== null) {
    e.preventDefault();
    const circle = circles[selectedCircleIndex];
    if (e.deltaY < 0) {
      circle.radius += 5;
    } else if (e.deltaY > 0 && circle.radius > 5) {
      circle.radius -= 5;
    }
    drawCircles();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Delete" || e.key === "Backspace") {
    if (selectedCircleIndex !== null) {
      circles.splice(selectedCircleIndex, 1);
      selectedCircleIndex = null;
      drawCircles();
    }
  }
});

function getMousePosition(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getCircleAt(x, y) {
  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    const dist = Math.hypot(circle.x - x, circle.y - y);
    if (dist <= circle.radius) return i;
  }
  return null;
}

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.selected ? "tomato" : "dodgerblue";
    ctx.fill();
    ctx.stroke();
  });
}

drawCircles();
