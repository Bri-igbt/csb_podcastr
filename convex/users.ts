import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
    args: {
        cleckId: v.string(),
        imageUrl: v.string(),
        name: v.string(),
        email: v.string(),
    }, handler: async (ctx, args) => {
        await ctx.db.insert('users', {
            clerkId: args.cleckId,
            email: args.email,
            name: args.name,
            imageUrl: args.imageUrl
        })
    }
})