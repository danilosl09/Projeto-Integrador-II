const ctx = document.getElementById('lineChart');

const eixoX = ['A', 'B', 'C', 'D', 'F'];

const eixoY = [1,2,3,4,5];


  new Chart(ctx, {
    type: 'line',
    data: {
      labels: eixoX,
      datasets: [{
        label: 'Corrente (A)',
        data: eixoY,
        backgroundColor: 'rgba(85, 85, 85, 1)',
        bordercolor: 'rgb(41, 155, 99)',
        borderWidth: 2
      }]
    },
    options: {
        Responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


