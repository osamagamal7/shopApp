import moment from 'moment'

class Order {
    constructor(id, items, totalAmount, date){
        this.id = id
        this.items = items
        this.totalAmount = totalAmount
        this.date = date
    }

    get readbleDate(){
        // return this.date.toLocaleString('en-US', {
        //     year: "numeric",
        //     month: "long",
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // })
        return moment(this.date).format('MMMM Do YYYY, hh:mm');

    }
}

export default Order