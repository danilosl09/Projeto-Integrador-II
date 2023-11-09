const ctx = document.getElementById('lineChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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