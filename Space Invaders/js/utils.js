// Generates a random number between, or including, the minimum and maximum values.
function RandomRange (min, max)
{
    var randomNumber = Math.floor(Math.random() * (max - 1 + min)) + min;
    
    return randomNumber;
}