#!/usr/bin/perl -w

use strict;
use warnings;
use lib 'C:/Users/monish.m/Desktop/Task/React/imageapp/perl files';
use CGI;
use Unsplash;

my $q = CGI->new();
print $q->header;

if($ENV{'REQUEST_METHOD'} eq "GET"){

    my $keyword = $q->param('keyword');
    my $obj = new Unsplash($keyword);
    my $response = $obj->unsplashApi();
    print $response;
}

1;


