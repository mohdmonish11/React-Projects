#!/usr/bin/perl -w

package MealDB;
use strict;
use warnings;
use LWP::UserAgent;
use JSON;
use constant URL => 'https://www.themealdb.com/api/json/v1/1/';

sub apiConnection {
    my $url = shift;
    my $userAgent = new LWP::UserAgent;
    my $header =['Content-Type' =>'application/json; charset=UTF-8'];
    my $request = new HTTP::Request('GET', $url, $header);
    my $response = $userAgent->request($request);
    return $response;
}

sub FetchMenuByName{
    my $query = shift;
    my $url = URL."search.php?$query";
    my $response = apiConnection($url);
    my $result;
    
    if ($response->is_success){
        my $fetched_data= from_json($response->{'_content'});
        my @meal_data;
        my @ingredient;
        if ($fetched_data->{'meals'}){
            foreach my $recipe(sort @{$fetched_data->{'meals'}}){
                foreach my $ingredient(keys %$recipe){
                    push @ingredient, $recipe->{$ingredient} if ($ingredient =~/^strIngredient/ && $recipe->{$ingredient} ne '' );
                }
                push @meal_data, { idMeal => $recipe->{idMeal},
                              strMeal => $recipe->{strMeal},
                              strMealThumb => $recipe->{strMealThumb},
                              strIngredient => \@ingredient
                            };
            }
            $result = {
                status => 1, 
                meals => \@meal_data
                };
            return to_json($result);
        } else{
            $result = {
                status => 0,
                err_msg => "NO DATA AVAILABLE FOR THAT INPUT"
                };
            return to_json($result);
        }
    } else{
        $result = {
            status => 0,
            err_msg => "NO DATA FROM API"
        };
        return to_json($result);
    }
}

sub listByAreaCategoryIngredient{
    my $query = shift;
    my $url = URL."list.php?$query";          
    my $response = apiConnection($url);
    
    if ($response->is_success){
        return $response->{'_content'};
    } else{
        my $result = {
                status => 0,
                err_msg => "NO DATA AVAILABLE FOR THAT INPUT"
            };
        return to_json($result);
    }
}

sub filterByAreaCategoryIngredient{
    my $query = shift;
    my $url = URL."filter.php?$query";
    my $response = apiConnection($url);
    
    if ($response->is_success){
        return $response->{'_content'};
    }
    else{
        my $result = {
                status => 0,
                err_msg => "NO DATA AVAILABLE FOR THAT INPUT"
            };
        return to_json($result);
    }
}


1;