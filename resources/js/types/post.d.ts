export interface IPost {
    id:         number;
    user_id:    number;
    slug:       string;
    title:      string;
    content:    IPostContent;
    category:   string;
    created_at: Date;
    updated_at: Date;
    user:       User;
}

export interface IPostContent {
    type:    string;
    content: PurpleContent[];
}

export interface PurpleContent {
    type:    string;
    content: FluffyContent[];
    attrs:   PurpleAttrs;
}

export interface PurpleAttrs {
    textAlign: string;
}

export interface FluffyContent {
    type:  string;
    attrs: FluffyAttrs;
}

export interface FluffyAttrs {
    src:    null;
    alt:    string;
    title:  null;
    width:  null;
    height: null;
    id:     string;
}

