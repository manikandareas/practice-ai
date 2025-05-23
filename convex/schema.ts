import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Defines the database schema for the application.
 * This includes definitions for 'tasks' and 'users' tables.
 */
export default defineSchema({
	users: defineTable({
		username: v.string(),
		email: v.string(),
		userId: v.string(),
		// role: v.union(v.literal("admin"), v.literal("user")),
		exp: v.optional(v.number()),
		leaderboardRank: v.optional(v.number()),
		profileImage: v.optional(v.string()),
		alreadyOnboarded: v.boolean(),
	}).index("by_user_id", ["userId"])
		.index("by_email", ["email"])
		.index("by_rank", ["leaderboardRank"]),

	quizzes: defineTable({
		title: v.string(),
		description: v.optional(v.string()),
		questions: v.array(
			v.object({
				question: v.string(),
				options: v.array(v.string()),
				difficulty: v.union(
					v.literal("easy"),
					v.literal("medium"),
					v.literal("hard")
				),
				questionType: v.union(
					v.literal("multiple_choice"),
					v.literal("true_false"),
					v.literal("multiple_selection")
				),
				correctOptionIndex: v.number(),
				explanation: v.string(),
			})
		),
		quizContext: v.union(
			v.object({ type: v.literal("pdf"), fileUrl: v.string() }),
			v.object({ type: v.literal("url"), source: v.string() }),
			v.object({ type: v.literal("prompt"), text: v.string() })
		),
		createdBy: v.id("users"),
	}).index("by_creator", ["createdBy"]),

	quiz_attempts: defineTable({
		userId: v.id("users"),
		quizId: v.id("quizzes"),
		questionAnswers: v.array(
			v.object({
				questionIndex: v.number(),
				selectedIndex: v.number(),
				isCorrect: v.boolean(),
				timeTaken: v.number(), // ms
			})
		),
		totalScore: v.number(),
		expEarned: v.number(),
		startedAt: v.number(),
		endedAt: v.optional(v.number()),
	}).index("by_user", ["userId"])
		.index("by_quiz", ["quizId"])
		.index("by_user_quiz", ["userId", "quizId"]),

	multiplayer_rooms: defineTable({
		code: v.string(), // room code
		quizId: v.id("quizzes"),
		hostId: v.id("users"),
		status: v.union(
			v.literal("waiting"),
			v.literal("active"),
			v.literal("finished")
		),
		currentQuestionIndex: v.number(),
		currentQuestionStartedAt: v.optional(v.number()),
	}).index("by_code", ["code"])
		.index("by_host", ["hostId"]),

	multiplayer_players: defineTable({
		roomId: v.id("multiplayer_rooms"),
		userId: v.id("users"),
		isHost: v.boolean(),
		joinedAt: v.number(),
		score: v.number(),
		questionAnswers: v.array(
			v.object({
				questionIndex: v.number(),
				selectedIndex: v.number(),
				isCorrect: v.boolean(),
				timeTaken: v.number(),
				answeredAt: v.number()
			})
		),
	}).index("by_room", ["roomId"])
		.index("by_user", ["userId"])
		.index("by_room_user", ["roomId", "userId"]),

	uploads: defineTable({
		userId: v.id("users"),
		sourceType: v.union(v.literal("pdf"), v.literal("url")),
		sourceUrl: v.string(), // url/pdf file url
		parsedText: v.optional(v.string()),
		associatedQuizId: v.optional(v.id("quizzes")),
		uploadedAt: v.number(),
	}).index("by_user", ["userId"])
		.index("by_quiz", ["associatedQuizId"]),
});