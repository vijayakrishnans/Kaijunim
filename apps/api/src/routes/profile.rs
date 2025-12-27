use axum::{extract::Path, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Serialize;

use crate::AppState;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Links {
    pub website: &'static str,
    pub twitter: &'static str,
    pub youtube: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Profile {
    pub id: &'static str,
    pub name: &'static str,
    pub bio: &'static str,
    pub avatar_url: &'static str,
    pub links: Links,
    pub followers_count: u32,
    pub following_count: u32,
    pub featured_product_ids: Vec<&'static str>,
    pub created_at: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DetailResponse<T> {
    pub item: T,
}

pub fn router() -> Router<AppState> {
    Router::<AppState>::new().route("/:id", get(get_profile))
}

async fn get_profile(Path(id): Path<String>) -> impl IntoResponse {
    sample_profiles()
        .into_iter()
        .find(|profile| profile.id == id)
        .map(|profile| Json(DetailResponse { item: profile }))
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Profile not found"))
}

fn sample_profiles() -> Vec<Profile> {
    vec![
        Profile {
            id: "profile-1",
            name: "Alex Carter",
            bio: "Filmmaker sharing LUTs, templates, and creative business tips.",
            avatar_url: "https://placehold.co/128x128?text=Alex",
            links: Links {
                website: "https://alexcarter.film",
                twitter: "https://twitter.com/alexcarter",
                youtube: "https://youtube.com/@alexcarter",
            },
            followers_count: 48200,
            following_count: 410,
            featured_product_ids: vec!["prod-101", "prod-104"],
            created_at: "2023-07-01T10:00:00Z",
        },
        Profile {
            id: "profile-2",
            name: "Lina Park",
            bio: "Colorist and cinematographer. Obsessed with stylized looks.",
            avatar_url: "https://placehold.co/128x128?text=Lina",
            links: Links {
                website: "https://linapark.studio",
                twitter: "https://twitter.com/linacolor",
                youtube: "https://youtube.com/@linacolor",
            },
            followers_count: 32800,
            following_count: 280,
            featured_product_ids: vec!["prod-101", "prod-106"],
            created_at: "2022-11-12T09:00:00Z",
        },
        Profile {
            id: "profile-3",
            name: "Nora Castillo",
            bio: "Composer crafting ambient textures for games and film.",
            avatar_url: "https://placehold.co/128x128?text=Nora",
            links: Links {
                website: "https://noracastillo.audio",
                twitter: "https://twitter.com/noramusica",
                youtube: "https://youtube.com/@noramusica",
            },
            followers_count: 18900,
            following_count: 160,
            featured_product_ids: vec!["prod-103"],
            created_at: "2024-02-05T12:30:00Z",
        },
    ]
}
