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
    /* This test suite is all about the RSS feeds definitions,
    the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        //Make sure the allFeeds variable has been defined and not empty.
          
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Check if feed URL is defined and not empty by using a
         * test that loops through each feed in the allFeeds object.
         */

         it('feed url defined and not empty', function() {
           for(let feed of allFeeds){
             //Check if feed.url is defined or not
               expect(feed.url).toBeDefined();
             //Check feed.url length
               expect(feed.url.length).not.toBe(0);
           }
         });

        /* Check if feed's name is defined and not empty by using a test that
         * loops through each feed in the allFeeds object.
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


    // Test suite for "The menu" functionality
    describe('The menu', function() {

      //Check the menu is hidden by defaul
      it('menu is hidden by default', function() {
        const body = document.querySelector('body');
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });

    //Check the menu will display when clicked and hide when clicked again

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

    //Test suite for  "Initial Entries"

    //Referenced https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
      describe('Initial Entries', function() {
        //Load feed until it is done
        beforeEach(function(done){
          loadFeed(0, done);
        });

       //Check the completed feed content is not empty
        it('completes load feed', function(){
          const feed = document.querySelectorAll('.feed .entry');
          //Verify feed contains at least one .entry element
          console.log(feed);
          expect(feed.length).toBeGreaterThan(0);
        });

      });

    //Test suite for "New Feed Selection
    // Referenced https://github.com/PlaySnowi/Feed-Reader-Testing/blob/master/jasmine/spec/feedreader.js
       describe('New Feed Selection', function(){

    // Load multiple feeds and compare their content to ensure changes

    // variables hold multiple feeds
          let feedOne, feedTwo;

          beforeEach(function(done){
            //Load feedOne
            loadFeed(0, function() {
              feedOne = document.querySelector('.feed').innerHTML;
              //Verify feedOne content
              console.log(feedOne);
              //Load feedTwo
              loadFeed(1, function() {
                feedTwo = document.querySelector('.feed').innerHTML;
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
