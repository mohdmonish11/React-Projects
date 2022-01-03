#!/usr/bin/perl -w

package GithubIssue;
use strict;
use warnings;
use LWP::UserAgent;
use JSON;
use constant URL => 'https://api.github.com/';

sub new {
    my $class = shift;
    my $self = {
        owner => shift,
        repo => shift ,
        state => shift
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

sub checkUserExist {
    my $object = shift;
    my $owner = $object->{'owner'};
    my $user_url = URL.'users/'.$owner;
    my $response = apiConnection($user_url);
    my $result;
    if($response -> is_success){
        $result = {
            status => 202
        };
        return $result;
    } else{
        $result ={
            status => 404,
            error_msg => "USER DOESNOT EXIST"
        };
        return $result;
    }
};

sub checkRepoExist {
    my $object = shift;
    my $owner = $object->{'owner'};
    my $repo = $object->{'repo'};
    my $repo_url = URL.'users/'.$owner.'/repos';
    my $response = apiConnection($repo_url);
    my $result;
    my @repository;
    if ($response -> is_success){
        my $repo_detail = decode_json($response->{'_content'});
        for my $data(@$repo_detail){
            push(@repository, $data->{'name'});
        }
        # grep(Expression, @Array) used to extract any element from the given array 
        # which evaluates the true value for the given regular expression
        if (grep {$_ eq $repo} @repository){
            $result = {
                status => 202
            };
            return $result;
        } else{
            $result = {
                status => 404,
                error_msg => "REPOSITORY DOESNOT EXIST"
            };
            return $result;
        }
    }   

}

sub githubissue {
    my $object = shift;
    my $owner = $object->{'owner'};
    my $repo = $object->{'repo'};
    my $state = $object->{'state'};
    my $user_exist = $object->checkUserExist();
    if ($user_exist->{'status'} == 404){
        return to_json($user_exist);
    } else{
        my $repo_check = $object->checkRepoExist();
        if ($repo_check->{'status'} == 404){
            return to_json($repo_check);
        } else{
            my $url = URL.'repos/'.$owner.'/'.$repo.'/issues?page_limit=1000&state='.$state;
            my $response = apiConnection($url);
            if ($response-> is_success){
                return $response->{'_content'};
            } else{
                my $result ={
                    status => 404,
                    error_msg => "NO DATA RECEIVED FROM API"
                };
                return to_json($result);
            }
        }
    }

}
1;