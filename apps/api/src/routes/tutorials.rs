use axum::{extract::Path, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Serialize;

use crate::AppState;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Creator {
    pub id: &'static str,
    pub name: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Tutorial {
    pub id: &'static str,
    pub creator: Creator,
    pub title: &'static str,
    pub description: &'static str,
    pub content_markdown: &'static str,
    pub category: &'static str,
    pub thumbnail_url: &'static str,
    pub difficulty: &'static str,
    pub estimated_minutes: u32,
    pub tags: Vec<&'static str>,
    pub views: u32,
    pub likes: u32,
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
        .route("/", get(list_tutorials))
        .route("/:id", get(get_tutorial))
}

async fn list_tutorials() -> Json<ListResponse<Tutorial>> {
    Json(ListResponse {
        items: sample_tutorials(),
        next_cursor: None,
    })
}

async fn get_tutorial(Path(id): Path<String>) -> impl IntoResponse {
    sample_tutorials()
        .into_iter()
        .find(|tutorial| tutorial.id == id)
        .map(|tutorial| Json(DetailResponse { item: tutorial }))
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Tutorial not found"))
}

fn sample_tutorials() -> Vec<Tutorial> {
    vec![
        Tutorial {
            id: "tut-301",
            creator: Creator {
                id: "creator-1",
                name: "Mae Tan",
            },
            title: "Color Grading Anime Edits in DaVinci Resolve",
            description: "Step-by-step workflow to achieve vibrant anime-inspired grades.",
            content_markdown: "## Workflow\n1. Balance exposure\n2. Build base look\n3. Add halation\n4. Export presets",
            category: "video",
            thumbnail_url: "https://placehold.co/640x360?text=Resolve+Color",
            difficulty: "intermediate",
            estimated_minutes: 28,
            tags: vec!["resolve", "color", "anime"],
            views: 9200,
            likes: 610,
            created_at: "2025-01-03T12:00:00Z",
        },
        Tutorial {
            id: "tut-302",
            creator: Creator {
                id: "creator-2",
                name: "Julian Reed",
            },
            title: "Building a VTuber Rig in Live2D",
            description: "Prepare PSDs, rig physics, and export for streaming software.",
            content_markdown: "## Rig Steps\n- Layer prep\n- Parameter mapping\n- Physics tuning\n- Export",
            category: "art",
            thumbnail_url: "https://placehold.co/640x360?text=Live2D+Rig",
            difficulty: "advanced",
            estimated_minutes: 42,
            tags: vec!["live2d", "rigging", "vtuber"],
            views: 13400,
            likes: 940,
            created_at: "2024-12-22T15:30:00Z",
        },
        Tutorial {
            id: "tut-303",
            creator: Creator {
                id: "creator-3",
                name: "Luca Ramos",
            },
            title: "Quick Start: Shorts Editing Template",
            description: "Use markers, auto-captions, and beat snaps for faster shorts.",
            content_markdown: "## Timeline\n- Import template\n- Sync music\n- Add captions\n- Export vertical",
            category: "editing",
            thumbnail_url: "https://placehold.co/640x360?text=Shorts+Template",
            difficulty: "beginner",
            estimated_minutes: 18,
            tags: vec!["shorts", "editing", "caption"],
            views: 7400,
            likes: 520,
            created_at: "2025-01-10T09:10:00Z",
        },
        Tutorial {
            id: "tut-304",
            creator: Creator {
                id: "creator-4",
                name: "Studio Mira",
            },
            title: "Designing Motion Graphic Lower Thirds",
            description: "Animate clean lower thirds with responsive timing controls.",
            content_markdown: "## Build\n1. Shapes\n2. Text styles\n3. Animation\n4. Export mogrt",
            category: "motion",
            thumbnail_url: "https://placehold.co/640x360?text=Lower+Thirds",
            difficulty: "intermediate",
            estimated_minutes: 24,
            tags: vec!["motion", "after effects", "broadcast"],
            views: 6600,
            likes: 430,
            created_at: "2025-01-07T16:00:00Z",
        },
        Tutorial {
            id: "tut-305",
            creator: Creator {
                id: "creator-5",
                name: "Devon Hart",
            },
            title: "Monetize with Gumroad Automation",
            description: "Set up product pages, updates, and customer emails with zaps.",
            content_markdown: "## Monetize\n- Product bundle\n- Launch emails\n- Update pipeline",
            category: "business",
            thumbnail_url: "https://placehold.co/640x360?text=Gumroad",
            difficulty: "beginner",
            estimated_minutes: 22,
            tags: vec!["gumroad", "automation", "launch"],
            views: 4100,
            likes: 290,
            created_at: "2025-01-15T11:00:00Z",
        },
        Tutorial {
            id: "tut-306",
            creator: Creator {
                id: "creator-6",
                name: "Rin Okada",
            },
            title: "Sound Design for Cozy Game Ambience",
            description: "Layer foley, room tone, and gentle melodies for warm vibes.",
            content_markdown: "## Layers\n- Foley beds\n- Loops\n- Reverb\n- Final mix",
            category: "audio",
            thumbnail_url: "https://placehold.co/640x360?text=Cozy+Audio",
            difficulty: "intermediate",
            estimated_minutes: 35,
            tags: vec!["audio", "foley", "game"],
            views: 5800,
            likes: 360,
            created_at: "2024-12-30T13:15:00Z",
        },
    ]
}
