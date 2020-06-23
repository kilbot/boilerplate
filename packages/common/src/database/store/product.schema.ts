export default {
	title: 'Product schema',
	version: 0,
	description: 'describes a product',
	type: 'object',
	properties: {
		id: {
			// required: false,
			description: 'Unique identifier for the resource.',
			type: 'string',
			primary: true,
		},
		name: {
			// required: false,
			description: 'Product name.',
			type: 'string',
		},
		slug: {
			// required: false,
			description: 'Product slug.',
			type: 'string',
		},
		// date_created: {
		// 	// required: false,
		// 	description: "The date the product was created, in the site's timezone.",
		// 	type: 'date-time',
		// },
		// date_created_gmt: {
		// 	// required: false,
		// 	description: 'The date the product was created, as GMT.',
		// 	type: 'date-time',
		// },
		type: {
			// required: false,
			enum: ['simple', 'grouped', 'external', 'variable'],
			description: 'Product type.',
			type: 'string',
		},
		status: {
			// required: false,
			enum: ['draft', 'pending', 'private', 'publish', 'future'],
			description: 'Product status (post status).',
			type: 'string',
		},
		featured: {
			// required: false,
			description: 'Featured product.',
			type: 'boolean',
		},
		catalog_visibility: {
			// required: false,
			enum: ['visible', 'catalog', 'search', 'hidden'],
			description: 'Catalog visibility.',
			type: 'string',
		},
		description: {
			// required: false,
			description: 'Product description.',
			type: 'string',
		},
		short_description: {
			// required: false,
			description: 'Product short description.',
			type: 'string',
		},
		sku: {
			// required: false,
			description: 'Unique identifier.',
			type: 'string',
		},
		regular_price: {
			// required: false,
			description: 'Product regular price.',
			type: 'string',
		},
		sale_price: {
			// required: false,
			description: 'Product sale price.',
			type: 'string',
		},
		// date_on_sale_from: {
		// 	// required: false,
		// 	description: "Start date of sale price, in the site's timezone.",
		// 	type: 'date-time',
		// },
		// date_on_sale_from_gmt: {
		// 	// required: false,
		// 	description: 'Start date of sale price, as GMT.',
		// 	type: 'date-time',
		// },
		// date_on_sale_to: {
		// 	// required: false,
		// 	description: "End date of sale price, in the site's timezone.",
		// 	type: 'date-time',
		// },
		// date_on_sale_to_gmt: {
		// 	// required: false,
		// 	description: "End date of sale price, in the site's timezone.",
		// 	type: 'date-time',
		// },
		virtual: {
			// required: false,
			description: 'If the product is virtual.',
			type: 'boolean',
		},
		downloadable: {
			// required: false,
			description: 'If the product is downloadable.',
			type: 'boolean',
		},
		downloads: {
			// required: false,
			description: 'List of downloadable files.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'File ID.',
						type: 'string',
						context: ['view', 'edit'],
					},
					name: {
						description: 'File name.',
						type: 'string',
						context: ['view', 'edit'],
					},
					file: {
						description: 'File URL.',
						type: 'string',
						context: ['view', 'edit'],
					},
				},
			},
		},
		// download_limit: {
		// 	// required: false,
		// 	description: 'Number of times downloadable files can be downloaded after purchase.',
		// 	type: 'integer',
		// },
		// download_expiry: {
		// 	// required: false,
		// 	description: 'Number of days until access to downloadable files expires.',
		// 	type: 'integer',
		// },
		external_url: {
			// required: false,
			description: 'Product external URL. Only for external products.',
			type: 'string',
		},
		button_text: {
			// required: false,
			description: 'Product external button text. Only for external products.',
			type: 'string',
		},
		tax_status: {
			// required: false,
			enum: ['taxable', 'shipping', 'none'],
			description: 'Tax status.',
			type: 'string',
		},
		tax_class: {
			// required: false,
			description: 'Tax class.',
			type: 'string',
		},
		manage_stock: {
			// required: false,
			description: 'Stock management at product level.',
			type: 'boolean',
		},
		stock_quantity: {
			// required: false,
			description: 'Stock quantity.',
			type: 'string',
		},
		stock_status: {
			// required: false,
			enum: ['instock', 'outofstock', 'onbackorder'],
			description: 'Controls the stock status of the product.',
			type: 'string',
		},
		backorders: {
			// required: false,
			enum: ['no', 'notify', 'yes'],
			description: 'If managing stock, this controls if backorders are allowed.',
			type: 'string',
		},
		sold_individually: {
			// required: false,
			description: 'Allow one item to be bought in a single order.',
			type: 'boolean',
		},
		weight: {
			// required: false,
			description: 'Product weight (kg).',
			type: 'string',
		},
		dimensions: {
			// required: false,
			description: 'Product dimensions.',
			type: 'object',
		},
		shipping_class: {
			// required: false,
			description: 'Shipping class slug.',
			type: 'string',
		},
		reviews_allowed: {
			// required: false,
			description: 'Allow reviews.',
			type: 'boolean',
		},
		upsell_ids: {
			// required: false,
			description: 'List of up-sell products IDs.',
			type: 'array',
			items: {
				type: 'integer',
			},
		},
		cross_sell_ids: {
			// required: false,
			description: 'List of cross-sell products IDs.',
			type: 'array',
			items: {
				type: 'integer',
			},
		},
		parent_id: {
			// required: false,
			description: 'Product parent ID.',
			type: 'integer',
		},
		purchase_note: {
			// required: false,
			description: 'Optional note to send the customer after purchase.',
			type: 'string',
		},
		categories: {
			// required: false,
			description: 'List of categories.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'Category ID.',
						type: 'string',
						context: ['view', 'edit'],
					},
					name: {
						description: 'Category name.',
						type: 'string',
						context: ['view', 'edit'],
						readonly: true,
					},
					slug: {
						description: 'Category slug.',
						type: 'string',
						context: ['view', 'edit'],
						readonly: true,
					},
				},
			},
		},
		tags: {
			// required: false,
			description: 'List of tags.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'Tag ID.',
						type: 'string',
						context: ['view', 'edit'],
					},
					name: {
						description: 'Tag name.',
						type: 'string',
						context: ['view', 'edit'],
						readonly: true,
					},
					slug: {
						description: 'Tag slug.',
						type: 'string',
						context: ['view', 'edit'],
						readonly: true,
					},
				},
			},
		},
		images: {
			// required: false,
			description: 'List of images.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'Image ID.',
						type: 'string',
						context: ['view', 'edit'],
					},
					// date_created: {
					// 	description: "The date the image was created, in the site's timezone.",
					// 	type: 'date-time',
					// 	context: ['view', 'edit'],
					// 	readonly: true,
					// },
					// date_created_gmt: {
					// 	description: 'The date the image was created, as GMT.',
					// 	type: 'date-time',
					// 	context: ['view', 'edit'],
					// 	readonly: true,
					// },
					// date_modified: {
					// 	description: "The date the image was last modified, in the site's timezone.",
					// 	type: 'date-time',
					// 	context: ['view', 'edit'],
					// 	readonly: true,
					// },
					// date_modified_gmt: {
					// 	description: 'The date the image was last modified, as GMT.',
					// 	type: 'date-time',
					// 	context: ['view', 'edit'],
					// 	readonly: true,
					// },
					src: {
						description: 'Image URL.',
						type: 'string',
						format: 'uri',
						context: ['view', 'edit'],
					},
					name: {
						description: 'Image name.',
						type: 'string',
						context: ['view', 'edit'],
					},
					alt: {
						description: 'Image alternative text.',
						type: 'string',
						context: ['view', 'edit'],
					},
				},
			},
		},
		attributes: {
			// required: false,
			description: 'List of attributes.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'Attribute ID.',
						type: 'string',
						context: ['view', 'edit'],
					},
					name: {
						description: 'Attribute name.',
						type: 'string',
						context: ['view', 'edit'],
					},
					position: {
						description: 'Attribute position.',
						type: 'integer',
						context: ['view', 'edit'],
					},
					visible: {
						description:
							'Define if the attribute is visible on the "Additional information" tab in the product\'s page.',
						type: 'boolean',
						default: false,
						context: ['view', 'edit'],
					},
					variation: {
						description: 'Define if the attribute can be used as variation.',
						type: 'boolean',
						default: false,
						context: ['view', 'edit'],
					},
					options: {
						description: 'List of available term names of the attribute.',
						type: 'array',
						items: {
							type: 'string',
						},
						context: ['view', 'edit'],
					},
				},
			},
		},
		default_attributes: {
			// required: false,
			description: 'Defaults variation attributes.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'Attribute ID.',
						type: 'string',
						context: ['view', 'edit'],
					},
					name: {
						description: 'Attribute name.',
						type: 'string',
						context: ['view', 'edit'],
					},
					option: {
						description: 'Selected attribute term name.',
						type: 'string',
						context: ['view', 'edit'],
					},
				},
			},
		},
		menu_order: {
			// required: false,
			description: 'Menu order, used to custom sort products.',
			type: 'integer',
		},
		meta_data: {
			// required: false,
			description: 'Meta data.',
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: {
						description: 'Meta ID.',
						type: 'string',
						context: ['view', 'edit'],
						readonly: true,
					},
					key: {
						description: 'Meta key.',
						type: 'string',
						context: ['view', 'edit'],
					},
					value: {
						description: 'Meta value.',
						// type: 'mixed',
						type: 'string',
						context: ['view', 'edit'],
					},
				},
			},
		},
	},
};
