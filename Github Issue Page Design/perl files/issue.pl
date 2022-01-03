#!/usr/bin/perl -w

use strict;
use warnings;
use Data::Dumper;
use lib '/home4/tqmohamm/public_html/React-task6';
use CGI;
use GithubIssue;

my $q = new CGI;
print $q->header();

if($ENV{'REQUEST_METHOD'} eq "GET"){
    my $owner = $q->param('owner');
    my $repo = $q->param('repo');
    my $state = $q->param('state');
    
    my $obj = new GithubIssue($owner, $repo, $state);
    my $response = $obj->githubissue();
    print $response;
}
1;