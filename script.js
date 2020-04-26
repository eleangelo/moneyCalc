
const generateID = () => `gloID${Math.round(Math.random()*1e8).toString(16)}`;


const totalBalance = document.querySelector('.total__balance'),
      totalMoneyIncome = document.querySelector('.total__money-income'),
      totalMoneyExpenses = document.querySelector('.total__money-expenses'),
      historyList = document.querySelector('.history__list'),
      form = document.getElementById('form'),
      operationName = document.querySelector('.operation__name'),
      operationAmount = document.querySelector('.operation__amount');
      

      let dataBaseOperation = [
        //   Удаляем отсюда
        //   {
        //       id:'riutri',
        //       description: 'Получила зарплату',
        //       amount: 30000,

        //   },
        //   {
        //       id:'hfjsgh',
        //       description: 'Квартплата',
        //       amount: -3830,

        //   },
        //   {
        //       id:'hgdjg',
        //       description: 'Продукты',
        //       amount: -2700,

        //   },
        //   {
        //       id:'dhghd',
        //       description: 'Получила премию',
        //       amount: 8000,

        //   },
        //   {
        //       id:'fsahf',
        //       description: 'Кафе',
        //       amount: -3000,

        //   },
          
        ];

        

        if(localStorage.getItem('calc')) {
            dataBaseOperation = JSON.parse(localStorage.getItem('calc'));
        }

        const renderOperation = (operation) => {

            const className = operation.amount < 0 ?
            'history__item-minus' :
            'history__item-plus';

            const listItem = document.createElement('li');

            listItem.classList.add('history__item');
            listItem.classList.add(className);

            listItem.innerHTML = `${operation.description}
                <span class="history__money">${operation.amount} ₽</span>
                <button class="history_delete" data-id="${operation.id}">x</button>
            `;

            historyList.append(listItem);

        };

        const updateBalance = () => {
         const resultIncome = dataBaseOperation
         .filter((item) => item.amount > 0)
         .reduce((result, item) => result + item.amount, 0)

         const resultExpenses = dataBaseOperation
         .filter((item) => item.amount < 0)
         .reduce((result, item) => result + item.amount, 0);

         totalMoneyIncome.textContent = resultIncome + ' ₽';
         totalMoneyExpenses.textContent = resultExpenses + ' ₽';
         totalBalance.textContent = (resultIncome + resultExpenses) + ' ₽';
        };
        
        const addOperation = (event) => {
            event.preventDefault();

           const operationNameValue = operationName.value,
                 operationAmountValue =  operationAmount.value;

                 operationName.style.borderColor = '';
                 operationAmount.style.borderColor = '';

                 if (operationNameValue !== '' && operationAmountValue !=='') {

                    const operation = {
                        id: generateID(),
                        description: operationNameValue,
                        amount: +operationAmountValue,
                       
                    };

                dataBaseOperation.push(operation);
                init();
                console.log(dataBaseOperation);
            
                 } else {
                     if (!operationNameValue) operationName.style.borderColor = 'red';
                     if (!operationAmountValue) operationAmount.style.borderColor = 'red';

                 }
                 operationName.value = '';
                 operationAmount.value = '';

        };

        // Удаляет операции с пощью делегирования
        const deleteOperation = (event) => {
            const target = event.target;
            if (target.classList.contains('history_delete')) {
            dataBaseOperation = dataBaseOperation.filter(operation => operation.id !== target.dataset.id);

            init();
            }

                
        
    };

        const init = () => {
            historyList.textContent = '';
    
            // описание метода - запускает ф-ию внутри себя столько раз, сколько элементов в массиве.
            //  ф-я без имени
            dataBaseOperation.forEach(renderOperation);

            // описание цикла
            // for (let i=0; i < dataBaseOperation.length; i++) {
            //     renderOperation(dataBaseOperation[i]);
            // }

            updateBalance();
            localStorage.setItem('calc', JSON.stringify(dataBaseOperation));
        };

        form.addEventListener('submit', addOperation);
        historyList.addEventListener('click', deleteOperation);



        init();

        