1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
                    --- Answer---

getElementById() :
                Its returns a single element ,only one element using Id.Example :finds one specific person by their unique ID

getElementsByClassName(): 
              using a class name and returns a live HTMLCollection.Example : Its like finds everyone wearing a specific color shirt.looks like an arry

querySelector() :
             chooses the first element that corresponds to a CSS selector.
querySelectorAll() ;
              returns a static NodeList without automatic updating after selecting all matching elements.




2. How do you create and insert a new element into the DOM?
                    --- Answer---
   we use document.createElement(). after creating it, we can add text using textContent or innerText.
    then we insert it into the webpage using methods like appendChild(), append(), or prepend() to place it inside a parent element.
    example: 
        const newBox = document.createElement('div');
        newBox.textContent = "hi im saykot ";
        newBox.style.color = "blue";
        document.body.appendChild(newBox);



3. What is Event Bubbling? And how does it work?
               --- Answer---
      when an event happens on an element, it also moves up to its parent elements.
      example; if you click a button inside a div, first the button works, then the div works, then the body.
       So the event moves from bottom to top.



4. What is Event Delegation in JavaScript? Why is it useful?
                 --- Answer---
       Event Delegation means adding one event listener to a parent element instead of adding many listeners to child elements.

   
it works because of event bubbling.
         it is useful because it saves code and improves performance.


6. What is the difference between preventDefault() and stopPropagation() methods?
                   --- Answer---
both are "Stop" commands, but they are used for different reasons.


preventDefault(): 
          stops the default action of an element, like stopping a form from being sent.

stopPropagation() 
         stops the event from moving to parent elements.It stops event bubbling.
