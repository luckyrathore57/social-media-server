import { PublishedStatus} from "@prisma/client";
import { string, z } from "zod";

const PublishedStatusz=z.enum([PublishedStatus.PUBLIC,PublishedStatus.PRIVATE,PublishedStatus.FRIENDSONLY]);

export const PostSchema=z.object({
    title:z.string().min(1),
    description:z.string().nullable(),
    images:z.array(z.string()),
    published:PublishedStatusz
    
})