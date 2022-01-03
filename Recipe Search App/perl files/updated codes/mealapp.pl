#!/usr/bin/perl -w

use strict;
use warnings;
use lib '/home4/tqmohamm/public_html/RecipeApp';
use CGI;
use MealDB;

my $q = new CGI;
print $q->header();

if($ENV{'REQUEST_METHOD'} eq "GET"){
    my $recipe_name = $q->param('recipe_name');
    my $list_type = $q->param('list_type');
    my $filter_word = $q->param ('filter_word');
    
    if ($recipe_name){
        my $url;
        if (length($recipe_name)> 1 ){
            $url = "s=".$recipe_name;
        } else{
            $url = "f=".$recipe_name;
        }
        my $response = MealDB::FetchMenuByName($url);
        print $response; 

    } elsif($list_type eq 'a' || $list_type eq 'i' || $list_type eq 'c'){
        my $url =   (lc($list_type) eq 'c') ? "c=list":
                    (lc($list_type) eq 'a')? "a=list": 
                    "i=list";
        my $response = MealDB::listByAreaCategoryIngredient($url);
        print $response;

    } elsif($list_type eq 'category' || $list_type eq 'area' || $list_type eq 'ingredient'){
        my $url =   (lc($list_type) eq 'category') ? "c=".$filter_word: 
                    (lc($list_type) eq 'area')? "a=".$filter_word: 
                    "i=".$filter_word;
        my $response = MealDB::filterByAreaCategoryIngredient($url);
        print $response;
    }
    else{
        my $result = {
                status => 0,
                err_msg => "INPUT NOT RECEIVED AT SERVER END"
                };
        print to_json($result);
    }
}
