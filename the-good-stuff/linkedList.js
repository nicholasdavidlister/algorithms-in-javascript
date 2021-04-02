function LinkedListItem ( value ) {
    this.value = value
    this.next = null
}

function LinkedList() {
    this.length = 0
    this.head = null
    this.tail = null
    LinkedList.prototype.add = ( value ) => {
        var li = new LinkedListItem( value )
        if (this.tail){ this.tail.next = li }
        this.tail = li
        if (this.length == 0){ this.head = li }
        this.length++
    }
    LinkedList.prototype.addHead = ( value ) => {
        var li = new LinkedListItem( value )
        li.next = this.head
        this.head = li
        if (this.length == 0){ this.tail = li }
        this.length++
    }
    LinkedList.prototype.dequeue = () => {
        let li = this.head
        if ( li ) {
            this.head = li.next
            if ( li.next == null ) this.tail = null
            this.length--
            return li.value
        } else {
            return null
        }
    }
}

module.exports = LinkedList