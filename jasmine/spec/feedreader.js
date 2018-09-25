/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('feed url defined and not empty', function() {
           for(let feed of allFeeds){
             //Check if feed.url is defined or not
               expect(feed.url).toBeDefined();
             //Check feed.url length
               expect(feed.url.length).not.toBe(0);
           }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('feed name defined and not empty', function() {
           for(let feed of allFeeds){
              //Check if feed.name is defined or not
               expect(feed.name).toBeDefined();
               //Check feed.name length
               expect(feed.name.length).not.toBe(0);
           }
         });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
       //Check the menu is hidden by defaul
      it('menu is hidden by default', function() {
        const body = document.querySelector('body');
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

      // Referenced https://matthewcranford.com/feed-reader-walkthrough-part-3-menu-test-suite/
        it('display when clicked and hide when clicked again', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            //Check the menu displays when clicked
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            //Check the menu hides when clicked again
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

          });
     });

    /* TODO: Write a new test suite named "Initial Entries" */

    //Referenced https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
      describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //Load feed until it is done
        beforeEach(function(done){
          loadFeed(0, done);
        });

       //Check the completed feed content is not empty
        it('completes load feed', function(){
          const feed = document.querySelector('.feed');
          expect(feed.children.length).toBeGreaterThan(0);
        });

      });
    /* TODO: Write a new test suite named "New Feed Selection" */

    // Referenced https://github.com/PlaySnowi/Feed-Reader-Testing/blob/master/jasmine/spec/feedreader.js
       describe('New Feed Selection', function(){

         /* TODO: Write a test that ensures when a new feed is loaded
          * by the loadFeed function that the content actually changes.
          * Remember, loadFeed() is asynchronous.
          */

          // variables hold multiple feeds
          let feedOne, feedTwo;

          beforeEach(function(done){
            //Load feedOne
            loadFeed(0, function() {
              feedOne = document.querySelector('.entry').innerText;
              //Verify feedOne content
              console.log(feedOne);
              //Load feedTwo
              loadFeed(1, function() {
                feedTwo = document.querySelector('.entry').innerText;
                //Verify feedTwo content
                console.log(feedTwo);
               // After feedOne and feedTwo are loaded, it is time for testing
                done();
            });

            });

          });
         //Compare feedOne and feedTwo content to ensure changes
         it('content changes', function() {
          expect(feedOne === feedTwo).toBe(false);
          });
        });
       });
