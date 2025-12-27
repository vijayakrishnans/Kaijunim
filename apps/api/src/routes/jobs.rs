use axum::{extract::Path, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Serialize;

use crate::AppState;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Poster {
    pub id: &'static str,
    pub name: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Job {
    pub id: &'static str,
    pub poster: Poster,
    pub title: &'static str,
    pub description: &'static str,
    pub category: &'static str,
    pub budget_min: u32,
    pub budget_max: u32,
    pub duration: &'static str,
    pub requirements: Vec<&'static str>,
    pub tags: Vec<&'static str>,
    pub status: &'static str,
    pub views: u32,
    pub applications_count: u32,
    pub created_at: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ListResponse<T> {
    pub items: Vec<T>,
    pub next_cursor: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DetailResponse<T> {
    pub item: T,
}

pub fn router() -> Router<AppState> {
    Router::<AppState>::new()
        .route("/", get(list_jobs))
        .route("/:id", get(get_job))
}

async fn list_jobs() -> Json<ListResponse<Job>> {
    Json(ListResponse {
        items: sample_jobs(),
        next_cursor: None,
    })
}

async fn get_job(Path(id): Path<String>) -> impl IntoResponse {
    sample_jobs()
        .into_iter()
        .find(|job| job.id == id)
        .map(|job| Json(DetailResponse { item: job }))
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Job not found"))
}

fn sample_jobs() -> Vec<Job> {
    vec![
        Job {
            id: "job-201",
            poster: Poster {
                id: "poster-1",
                name: "Aurora Studios",
            },
            title: "Localization for Sci-Fi Visual Novel",
            description: "Translate and adapt 60k words with VO timing notes for EN to JP.",
            category: "translator",
            budget_min: 3500,
            budget_max: 5200,
            duration: "6 weeks",
            requirements: vec![
                "Native Japanese",
                "Familiar with Ren'Py",
                "Sci-fi terminology",
            ],
            tags: vec!["visual novel", "localization", "script"],
            status: "open",
            views: 4820,
            applications_count: 42,
            created_at: "2025-01-05T14:00:00Z",
        },
        Job {
            id: "job-202",
            poster: Poster {
                id: "poster-2",
                name: "Indie Arcade Lab",
            },
            title: "Chiptune Composer for Retro Shooter",
            description: "Need 8 looping tracks + stingers inspired by 90s arcades.",
            category: "composer",
            budget_min: 1800,
            budget_max: 2600,
            duration: "4 weeks",
            requirements: vec![
                "Previous OST samples",
                "Ableton or Logic",
                "Loop-ready stems",
            ],
            tags: vec!["music", "retro", "arcade"],
            status: "open",
            views: 3610,
            applications_count: 28,
            created_at: "2025-01-02T10:30:00Z",
        },
        Job {
            id: "job-203",
            poster: Poster {
                id: "poster-3",
                name: "Glowwave",
            },
            title: "Twitch Overlay & Alerts Revamp",
            description: "Design animated overlays, stinger transitions, and alert widgets.",
            category: "designer",
            budget_min: 1200,
            budget_max: 1900,
            duration: "3 weeks",
            requirements: vec!["After Effects", "Twitch extensions", "Motion graphics"],
            tags: vec!["streaming", "overlay", "vtuber"],
            status: "open",
            views: 5210,
            applications_count: 33,
            created_at: "2024-12-28T09:10:00Z",
        },
        Job {
            id: "job-204",
            poster: Poster {
                id: "poster-4",
                name: "Skybound Media",
            },
            title: "Video Editor for Creator Weekly Recaps",
            description: "Edit 10-minute weekly recap videos with captions and motion graphics.",
            category: "editor",
            budget_min: 800,
            budget_max: 1200,
            duration: "Ongoing",
            requirements: vec!["Premiere or Resolve", "Captioning", "Short-form pacing"],
            tags: vec!["editing", "shorts", "captions"],
            status: "open",
            views: 7420,
            applications_count: 65,
            created_at: "2025-01-12T17:20:00Z",
        },
        Job {
            id: "job-205",
            poster: Poster {
                id: "poster-5",
                name: "Midnight Crafts",
            },
            title: "3D Artist for Cozy Crafting Game",
            description: "Model stylized props and modular room pieces with PBR textures.",
            category: "artist",
            budget_min: 2600,
            budget_max: 4100,
            duration: "8 weeks",
            requirements: vec!["Blender", "Substance Painter", "Game-ready topology"],
            tags: vec!["3d", "stylized", "game dev"],
            status: "open",
            views: 4100,
            applications_count: 24,
            created_at: "2025-01-08T12:45:00Z",
        },
        Job {
            id: "job-206",
            poster: Poster {
                id: "poster-6",
                name: "Creators Guild",
            },
            title: "Community Manager for Launch",
            description: "Host AMAs, manage Discord events, and publish weekly recaps.",
            category: "manager",
            budget_min: 1500,
            budget_max: 2200,
            duration: "3 months",
            requirements: vec!["Discord mod", "Content scheduling", "Crisis comms"],
            tags: vec!["community", "events", "discord"],
            status: "open",
            views: 2950,
            applications_count: 18,
            created_at: "2025-01-15T08:00:00Z",
        },
    ]
}
