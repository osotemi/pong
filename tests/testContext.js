// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('Context testing bench', function() {

  // inject the HTML fixture for the tests
  beforeEach(function() {
    var fixture = '<div id ="fixture"><img id="bola" style="position:absolute" src="images/squareWhite.png" />'+
    '<img id="stick" style="position:absolute" src="images/stickWhite.png" />'+
    '<h2 id="playerLeft"></h2>'+
    '<p id="scorePlayerLeft">0</p>'+
    '<img id="stick2" style="position:absolute" src="images/stickWhite.png" />'+
    '<h2 id="playerRight">v</h2>'+
    '<p id="scorePlayerRight">0</p>'+
    '<div id="vertical"></div>'+
    '<div id="banner" style="display:none;"></div></div>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture);

    var context = require('../frontend/javascript/context');
    this.context_ = new context();
  });

  // remove the html fixture from the DOM
  afterEach(function() {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('has a dummy spec to test 2 + 2', function() {
    // An intentionally failing test. No code within expect() will never equal 4.
    expect(2+2).toEqual(4);
  });
  /** Banner methods  */
  /**Banner methods are implemented*/
  it( 'Banner methods are present', function(){
    expect(this.context_.showBanner).toBeDefined();
    expect(this.context_.hideBanner).toBeDefined();
  });
  /** hideBanner() changes the display property of the bannerElement */
  it( 'Hide banner works properly', function(){
    var bannerElement = document.getElementById("banner");
    bannerElement.style.display = "block";
    expect(bannerElement.style.display).not.toEqual("none");
    this.context_.hideBanner();
    expect(bannerElement.style.display).toEqual("none");
  });
  //showBanner test functions
  /**showBanner() changes bannerElement.style.display value
  and set bannerElement.textContent to true*/
  it( 'Show banner displays a banner and writes an string', function(){
    var bannerElement = document.getElementById("banner");
    this.context_.showBanner();
    expect(bannerElement.style.display).toEqual("block");
    this.context_.showBanner("message");
    expect(bannerElement.textContent).toEqual("message");
  });
  /**showBanner( message ) changes the bannerElement.textContent string value */
  it( 'Show banner changes an string', function(){
    var bannerElement = document.getElementById("banner");
    expect(bannerElement.textContent).toEqual("");
    this.context_.showBanner("message");
    expect(bannerElement.textContent).toEqual("message");
    this.context_.showBanner("new message");
    expect(bannerElement.textContent).toEqual("new message");
  });
  /**showBanner( message, timeInMiliseconds )
  changes bannerElement.style.display value to block, changes bannerElement.textContent
  and change bannerElement.style.display value to none after timeInMiliseconds interval ends*/
  it( 'Show banner displays banner with a message a time in miliseconds ', function(){
    var bannerElement = document.getElementById("banner");
    var timeInMiliseconds = 1500;
    expect(bannerElement.style.display).toEqual("none");
    this.context_.showBanner("message", timeInMiliseconds);
    expect(bannerElement.textContent).toEqual("message");
    expect(bannerElement.style.display).toEqual("block");
    window.setTimeout( function(){} , timeInMiliseconds +10 );
    expect(bannerElement.style.display).toEqual("none")
  });
});
