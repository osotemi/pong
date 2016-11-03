Image bug:

To solve image resize bug, I resize de canvas when parsing the img from the modal form;
on function getBase64Image specifiying the final width & height that we are sepecting.

Resize screen bug:

To solve screen image bug, I initialize de ball and the sticks only on the constructor.
On the restart method; reallocate values ​​to objects depending on the size of the screen.
