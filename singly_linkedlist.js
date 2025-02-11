function Node(element) {
    //The node always has the value and next pointer -- this node is empty, in which we will fill up later in the linkedlist
    this.element = element;
    this.next = null;
}
//This just represents the node structure
//-----------------------------------------------------------------------------------------
function LinkedList() {
    //The actual linked list only cares about 2 properties: the head and tail*
    //Also good to add the tail
    //The head and tail are nodes with empty values*
    this.head = null;
    this.tail = null; // you can choose not to add tail
    this._length = 0;
}
//This just represents the list, or container we can put our nodes into. Of course, it needs to have a head and tail. You must always have the head (tail is optional). You have to set the tail to a value if something is not already there*

LinkedList.prototype.size = function() {
    return this._length;
};

LinkedList.prototype.isEmpty = function() {
    return this._length === 0;
};
//---------------------- ADD TO HEAD -------------------------------------------
LinkedList.prototype.addToHead = function(element) {
    //create a new Node
    var newNode = new Node(element);
    // Handle case for when linked list is not empty
    if (this.head) {
        newNode.next = this.head;
        //this.head = newNode;
    } else { // Linked list is empty
        this.tail = newNode;
        //this.head = newNode;
    }
    //set the head to the new node
    this.head = newNode;

    //increment count
    this._length++;
};

var foodList = new LinkedList();

// foodList.addToHead("pizza");
// console.log("PIZZA ADDED TO THE HEAD--->", foodList);

// foodList.addToHead("Spinach")
// console.log("SPINACH ADDED TO THE HEAD --->", foodList);
// -----------------------------------------------------------------------------

LinkedList.prototype.addToTail = function(element) {
    //create a new Node
    var newNode = new Node(element);
    // Handle case for when linked list is not empty
    if (this.tail) {
        //if there is already a tail, change the pointers to point to new node
        //if update the currently existing tails next to point to new node
        this.tail.next = newNode;
        //The tail is the newNode*
        //then finally update the linked list tail to be the new node
        //this.tail = newNode;
    } else {
        //if there is no tail, then there is no head
        this.head = newNode
        //if there is no tail. make LinkedList tail the new node
        //this.tail = newNode;
    }

    this.tail = newNode;
    //increment count
    this._length++;
};


// foodList.addToTail("Pasta");
// console.log("ADD TO TAIL--->", foodList);
// foodList.addToTail("Ramen");
// console.log("SECOND ADD TO TAIL---->", foodList);
// foodList.addToTail("Cupcakes");
// console.log("THIRD ADD TO TAIL---->", foodList);

LinkedList.prototype.removeHead = function() {
    //if there is a head, then there is a node or possibly nodes in the list
    var headExists = this.head;
    if(headExists) {

        //save the current value of the head
        var value = this.head.element;

        //case 1: there are multiple nodes
        if(this.head.next != null) {
            var temp = this.head;
            // there is another node so set that to the head
            this.head = this.head.next;
            //set the temp (previous) to null
            temp = null;
        } else {
            //this.head.next is a null, means there is only one node
            this.head = null;
            this.tail = null;
        }
        //since headExists
        this._length--;
    } else {
        //there is no head OR !this.head... So linked list is empty
        return null;
    }

    return value;
};

//Test remove addToHead
/*
var foodList = new LinkedList();
foodList.addToHead("pizza");
foodList.addToHead("Spinach");
foodList.addToHead("Pasta");
foodList.removeHead();
foodList.size();
console.log(foodList);
*/

LinkedList.prototype.findPrevious = function(item) {
    //start search from the beginning
    var currentNode = this.head;

    while(currentNode.next != null) {
        if(currentNode.next == item) {
            return currentNode;
        }
        currentNode = currentNode.next
    }
    return currentNode;
};

LinkedList.prototype.removeTail = function() {
    var previousNode = this.findPrevious(this.tail),
        tempTail = this.tail; //store a reference to the present tail

    /*
    Two things are possible if there is a previous node.
        1) there is only one node in the linked list
        2) there are multiple nodes
    */

    //case 1. there is only one node because next is null
    if(previousNode.next === null) {
        //reset both head and tail to null
        this.head = null;
        this.tail = null;
    } else { //case 2 (multiple nodes)
        //update the next node (tail) to be null
        previousNode.next = null;
        //set the previousNode as the new tail
        this.tail = previousNode;
    }

    this._length--;

    //return the name of tail removed to called (we would be nice to know what was removed)
    return tempTail.element;
};
/*
var numList = new LinkedList();
numList.addToTail("100");
numList.addToTail("200");
numList.addToTail("300");
numList.addToTail("400");
numList.removeTail();
numList.display();
*/

LinkedList.prototype.find = function(item) {
    var currentNode = this.head;
    while(currentNode) {
        if(currentNode.element === item) {
            return currentNode;
        }
        currentNode = currentNode.next;
    }
    return null;
    /*
    //Another way to write this is
    var currentNode = this.head;
    while(currentNode.element != item){
        currentNode = currentNode.next;
    }
    return currentNode;
    */
};

LinkedList.prototype.display = function() {
    var currentNode = this.head;
    while(currentNode) {
        console.log(currentNode.element);
        currentNode = currentNode.next;
    }
};

LinkedList.prototype.insert = function(position, element) {
    //create the new node based on the name passed
    var newNode = new Node(element);
    //find the position or item node we want to insert after.
    var positionNode = this.find(position);
    //if the position node is found update pointers
    if (positionNode != null) {
        //first set the next pointer of new node to be that of position nodes next
        newNode.next = positionNode.next;
        //finally update the positionNode's next to be the new node
        positionNode.next = newNode;
        this._length++;
    } else {
        //position not found, return error
        throw new Error("Position Node Doesnt Exist!");
    }
};

//Testing insert
/*
var peopleList = new LinkedList();
peopleList.addToTail("Kofi");
peopleList.addToTail("Tani");
peopleList.addToTail("Julie");
peopleList.insert("Tani", "Tarik");
peopleList.insert("Julie", "Charles");
peopleList.insert("Ben", "James");
peopleList.size();
peopleList.display();
console.log(peopleList);
*/

LinkedList.prototype.indexOf = function(element) {
    var currentNode = this.head,
        index = 0;

    while(currentNode) {
        if(currentNode.element === element) {
            return index;
        }
        index++;
        currentNode = currentNode.next;
    }
    return -1;
};

LinkedList.prototype.removeAt = function(position) {
    var length = this._length - 1;
    //check removal bounds. check if position is valid
    if(position > -1 && position <= length) {
        var currentNode = this.head,
            currentIndex = 0,
            nextIndex = currentIndex + 1;
        //if position is 0 then it means remove from Head. no need to reach loop
        if(position === 0) {
            //means remove the head and returns what was removed
            return this.removeHead();
        }
        if(position === length) {
            return this.removeTail();
        }
        //if its not the head or tail then search inbetween linked list.
        //being from head.
        while(currentNode) {
            console.log("current index: " + currentIndex);
            //if the next is equal to position then update the current header
            if(nextIndex === position) {
                console.log('match found at: ' + currentIndex);
                //set the current next to pointer to the nexts next.
                var temp = currentNode.next.next;
                //set temp to null
                currentNode.next = null;
                //finally set the current next to the object
                currentNode.next = temp;
                return currentNode;
            } else { // there is a match
                currentNode = currentNode.next;
                currentIndex++;
            }
        }
    } else {
        return null;
    }
};

LinkedList.prototype.remove = function(element) {
    //find element to remove index
    var elementIndex = this.indexOf(element);
    return this.removeAt(elementIndex)
};

