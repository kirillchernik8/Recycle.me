const graphpql = require('graphql')
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = graphpql;

const Place = require('./recyclePlace.js')

const PlaceType = new GraphQLObjectType({
	name: "Place",
	fields: () => ({
		address: {
			type: GraphQLString
		},
		latitude: {
			type: GraphQLString
		},
		longitude: {
			type: GraphQLString
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		places: {
			type: new GraphQLList(PlaceType),
			resolve(parent, args) {
				return Place.find({})
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addPlace: {
			type: PlaceType,
			args: {
				address: {
					type: new GraphQLNonNull(GraphQLString)
				},
				latitude: {
					type: new GraphQLNonNull(GraphQLString)
				},
				longitude: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(parent, args) {
				let place = new Place({
					address: args.address,
					latitude: args.latitude,
					longitude: args.longitude,
				})
				return place.save()
			}
		}
	}

})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})