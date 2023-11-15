

document.addEventListener('DOMContentLoaded', () => {

        fetch('http://localhost:3000/dados/jasonDados')

      .then(response => response.json())
      .then(dados => {
        const ctx = document.getElementById('barChart').getContext('2d');
        const categorias = dados.map(item => item.id_dados);
        const valores = dados.map(item => item.valorDado);
  
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: categorias,
            datasets: [{
              label: 'Valores por Categoria',
              data: valores,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => console.error('Erro ao obter dados:', error));
  });
  