document.addEventListener('DOMContentLoaded', () => {
    const seatMapContainer = document.getElementById('seat-map-container');
    const confirmSeatSelectionBtn = document.getElementById('confirm-seat-selection-btn');
    const businessClassBtn = document.getElementById('business-class-btn');
    const economyClassBtn = document.getElementById('economy-class-btn');

    const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    if (!bookingDetails) {
        window.location.href = 'index.html';
        return;
    }

    const passengerCount = bookingDetails.adults + bookingDetails.children;
    let selectedSeats = [];
    let currentSeatClass = 'business';

    function renderSeatMap(seatClass) {
        currentSeatClass = seatClass;
        seatMapContainer.innerHTML = '';
        selectedSeats = [];

        let unavailableSeats = seatClass === 'business' ? ['1A', '2C', '3D'] : ['5B', '6E', '7A', '10C', '12F', '14A', '15F'];

        const cabinLayout = {
            business: { rows: 5, letters: ['A', 'B', 'C', 'D'], aisleAfter: 'B' },
            economy: { rows: 15, letters: ['A', 'B', 'C', 'D', 'E', 'F'], aisleAfter: 'C', startRow: 6 }
        };

        const layout = cabinLayout[seatClass];
        const startRow = layout.startRow || 1;
        const numRows = layout.rows;
        const seatLetters = layout.letters;

        const seatSection = document.createElement('div');
        seatSection.classList.add('seat-section', `${seatClass}-section`);
        seatMapContainer.appendChild(seatSection);

        for (let row = startRow; row < startRow + numRows; row++) {
            seatLetters.forEach(letter => {
                if (letter === layout.aisleAfter) {
                    seatSection.appendChild(document.createElement('div')).classList.add('aisle');
                }
                const seatId = `${row}${letter}`;
                const seatElement = document.createElement('div');
                seatElement.classList.add('seat', 'available');
                seatElement.textContent = seatId;
                seatElement.dataset.seatId = seatId;

                if (unavailableSeats.includes(seatId)) {
                    seatElement.classList.replace('available', 'unavailable');
                } else {
                    seatElement.addEventListener('click', () => handleSeatClick(seatElement, seatId));
                }
                seatSection.appendChild(seatElement);
            });
        }
    }

    function handleSeatClick(seatElement, seatId) {
        if (seatElement.classList.contains('selected')) {
            seatElement.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatId);
        } else {
            if (selectedSeats.length < passengerCount) {
                seatElement.classList.add('selected');
                selectedSeats.push(seatId);
            } else {
                alert(`Zaten ${passengerCount} koltuk seçtiniz.`);
            }
        }
    }

    businessClassBtn.addEventListener('click', () => {
        businessClassBtn.classList.add('active');
        economyClassBtn.classList.remove('active');
        renderSeatMap('business');
    });

    economyClassBtn.addEventListener('click', () => {
        economyClassBtn.classList.add('active');
        businessClassBtn.classList.remove('active');
        renderSeatMap('economy');
    });

    confirmSeatSelectionBtn.addEventListener('click', () => {
        if (selectedSeats.length === passengerCount) {
            bookingDetails.selectedSeats = selectedSeats;
            bookingDetails.seatClass = currentSeatClass;
            sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
            window.location.href = 'payment.html';
        } else {
            alert(`Lütfen tam olarak ${passengerCount} adet koltuk seçin.`);
        }
    });

    renderSeatMap(currentSeatClass); // Initial render
});
