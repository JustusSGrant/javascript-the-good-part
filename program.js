document.writeln('Hello, world!');

/*
    ----------------------------------------------------------------------------------------------------------------------------------------
    ----------------------------------------------------------------------------------------------------------------------------------------
    Chapter 3: Objects
    ----------------------------------------------------------------------------------------------------------------------------------------
    ----------------------------------------------------------------------------------------------------------------------------------------
*/
var empty_object = {};

var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
}; // Object literal example

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2018-03-26 17:34",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2018-3-27 2:19",
        city: "Los Angelas"
    }
}; // Nested object example

// 3.01 - Standard value retireval examples
stooge["first-name"];
flight.departure.IATA;

// 3.02 - Using || operator to assign default values
var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";

// 3.03 - Attempting to retireve values from something that is undefined produces a typeError exception.
// The && operatpr can be used to guard against this exception.
flight.equipment && flight.equipment.model;

// 3. 04 - Updating an existing object value by assignment.
stooge["first-name"] = "Jerry";

// 3.05 - Updating an object with a non-existing value via augmentation
stooge["middle-name"] = "Perry";
stooge.nickname = "Terry";
flight.equipment = {
    model: "Boeing 747"
};
flight.status = "On Time";

// 3.06 - Using object reference
var x = stooge; // The value of stooge is not copied into x. X is a reference to stooge
x.nickname = "lonzo";
var nick = stooge.nickname; // Since x & stooge are references to the same object, this returns Lonzo. 
var a = {}, b = {}, c = {}; // 3 vars referencing 3 different empty objects.
var a, b, c = {}; // 3 vars referencing the same empty object.

// 3.07 - Prototypes
// Creating a new object and setting the prototype of the new object to that of the old object.
// This allows one object to inherit the properties of another.
if (typeof Object.beget !== 'function') {
    Object.beget = function (o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
};
var another_stooge = Object.beget(stooge);
// The second object is not affected by updates to the first.
another_stooge["first-name"] = "Johnny";
another_stooge["last-name"] = "Bravo";
another_stooge["nickname"] = "Lenny";
// If you add a new property to the protype of one object, any objects inheriting that prototype can also see the new property.
stooge.profession = "actor";
another_stooge.profession; // 'actor'

// 3.08 - Reflection
flight.hasOwnProperty("number"); // A way to check the properties of an object without getting snything from the object's prototype

// 3.09 - Enumeration
// Since the for...in loop also includes functions and prototype properties, typeof or hasOwnProperty is needed to filter out those unwanted objects.
for (let name in another_stooge) {
    if(typeof another_stooge[name] !== "function") {
        document.writeln(name) + ": " + another_stooge[name]
    }
}
// Since there is no garauntee on the order that the properties are returned in the for in loop,
// the following approach completes the enimeration without using a for...in loop.
var properties = [
    "first-name",
    "middle-name",
    "last-name",
    "profession"
];
for (let i = 0; i < properties.length; i++) {
    document.writeln(properties[i] + ": " + another_stooge[properties[i]]);
}

// 3.10 - Deletion
delete another_stooge.nickname // Deletes a property from an object. Exposes value of property on prototype.

// 3.11 - Global Abatement
// The following shows how to create a single global variable to be used as a container for the entire app.
var myApp = {};
myApp.stooge = {
    "first-name": "Bruce",
    "last-name": "Wayne"
}
myApp.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2018-03-26 17:34",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2018-3-27 2:19",
        city: "Los Angelas"
    }
};

/*
    ----------------------------------------------------------------------------------------------------------------------------------------
    ----------------------------------------------------------------------------------------------------------------------------------------
    Chapter 4: Functions
    ----------------------------------------------------------------------------------------------------------------------------------------
    ----------------------------------------------------------------------------------------------------------------------------------------
*/
function add(a, b) {
    return a + b;
}; // Function literal
var add = function(a, b) {
    return a + b;
}; // Anonymous function literal being assigned to a variable called 'add'

// 4.1 - The Method Invocation Pattern
// When a function is a property of an object, it is called a method.
// 'this' is bound to the parent object
var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    } 
};
myObject.increment();
document.writeln(myObject.value); // 1
myObject.increment(2); // 3

// 4.2 - The Function Invocation Pattern
// When a function is not part of an object, it is invoked as a function.
var sum = add(3, 4);
// 'this' is bound to the global object. This means that if the function has an inner function, the 'this' variable of the inner function is not bound to that of the outer function.
// The parent method must define a variable and assign it to 'this' to workaround this issue.
myObject.double = function() {
    var that = this;
    var helper = function() {
        that.value = add(that.value, that.value)
    }
    helper();
};
myObject.double();

// 4.3 - The Constructor Invocation Pattern
// If a function is invoked with the 'new' keyword, a new object is created with a hidden link to that functions prototype member, and 'this' is bound to the new object.
var Quo = function (string) {
    this.status = string;
}
Quo.prototype.get_status = function() {
    return this.status;
}
var myQuo = new Quo("confused"); //invoke function with 'new' keyword.
document.writeln(myQuo.getStatus);

// 4.4 - The Apply Invocation Keyword
var ary = [3, 4];
var sum = add.apply(null, ary); //The apply method lets us construct an array of arguments to use to invoke a function and manually choose the vakue of 'this'.
var statusObject = {
    status: 'A-OK'
} 
var status = Quo.prototype.get_status.apply(statusObject);

// 4.5 - The 'arguments' parameter
var sum = function(a, b) {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i]; // An array-like object of all params passed to the function, even if they aren't assigned to a variable.
    }
    return sum;
}
document.writeln(sum(2, 3, 4, 5, 6, 7, 8, 9, 10));

// 4.5 - Excpetion Handling
var add = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw { // The 'throw' statement interrupts the exeution of the current function. It should be given an exceptions object containing a name & descriptive msg.
            name: 'TypeError',
            message: 'add needs numbers only!'
        }
    }
    return a + b;
}
var try_it = function() {
    try { // when handling exceptions, use a try-catch block. if an excetion is thrown, the catch block should handle it.
        add("seven");
    } catch (e) { // If an exception is thrown in thr try block, control is given to the catch clause.
        document.writeln(e.name + ":\n " + e.message);
    }
}
try_it();

// 4.6 - Augmenting Types
// New methods can also be added to JS types.
Function.prototype.method = function(name, func) { //Example adds a new method called 'method' to the functions prototype
    this.prototype[name] = func;
    return this;
}
// Using example above, we add a new method 'integer' to the 'Number' prototype that converts input to an int.
Number.method('integer', function() { 
    return Math[this < 0 ? 'ceil' : 'floor'](this); 
});
document.writeln((-10 / 3).integer()); // -3
// Add a new method called 'trim' to string prototype that removes whitespace from the front & end of a string.
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "    neat    ".trim() + '"');
// Best practice is to only add a method to a basic type's prototype if you know the functionality is missing.
Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) { // Checks to see if the new function exists before performing the assignment.
        this.prototype[name] = func;
    }
}

// 4.7 - Recursion
var hanoi = function(disc, src, aux, dst) { //A recursive function is one that calls itself.
    if(disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
}
hanoi(3, 'Src', 'Aux', 'Dst');
// Define a walk_the_DOM that visits every node of the tree in HTML source order, starting with a given node.
// Recursively walks itself until it has processed each child node.
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk (node, func);
        node = node.nextSibling;
    }
};
// Defines a function getElementsByAttribute that takes an attr name and a matching value.
var getElementsByAttribute = function(attr, value) {
    var results= [];
    walk_the_DOM(document.body, function(node) { // Calls walk_the_dom and returns any matching nodes
        var actual = node.nodeType === 1 && node.getAttribute(attr);
        if (typeof actual === 'string' && (actual === value || typeof value != 'string')) {
            results.push(node);
        }
    });
    return results;
}