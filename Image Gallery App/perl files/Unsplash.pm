#!/usr/bin/perl -w

package Unsplash;
use strict;
use warnings;
use LWP::UserAgent;
use JSON;
use constant URL => "https://api.unsplash.com/search/photos?query=";

sub new{
    my $class = shift;
    my $self ={
        keyword => shift
    };
    return bless $self, $class;
}

sub apiConnection {
    my $url = shift;
    my $userAgent = new LWP::UserAgent;
    my $header =['Content-Type' =>'application/json; charset=UTF-8'];
    my $request = new HTTP::Request('GET', $url, $header);
    my $response = $userAgent->request($request);
    return $response;
}


sub unsplashApi{
    my $object = shift;
    my $keyword = $object->{'keyword'};
    my $url = URL.$keyword."&client_id=CRhBk-HIg4ien3ip1tMyvzLD9Bu9biYvTlFiLxjs-AI";
    my $response = apiConnection($url);
    if ($response-> is_success){
        return $response->{'_content'};
    } else{
        my $result = {
            status => 404,
            error_msg => "NO SUCH DATA AVAILABLE TO RELATED KEYWORD"
        };
        return to_json ($result);
    }
    
}
 
1;