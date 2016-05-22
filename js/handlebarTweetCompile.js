(function(){

    var tweetData = {
            "id": '708033764807483393',
            "maxTweets": 5,
            "dataOnly": true,
            "customCallback": populateTwtUlTemplate
        };

    tweetData = twitterFetcher.fetch( tweetData );

    function populateTwtUlTemplate( tweets ){
        
        var twtDatas = [];

        for( var i = 0; i < tweets.length; i++ ){
            
            var tweetInfoObj = {
                author : tweets[i].author,
                tweet : tweets[i].tweet
            };

            twtDatas.push( tweetInfoObj );
        }

        var compiledTwtTemp = Handlebars.compile( $( "#twitterTemplate" ).html() );
        $( ".tweetList" ).append( compiledTwtTemp( twtDatas ) );
        
    }
    
})();