{
    "package": null,
    "messages": [
        {
            "name": "CMsgVector",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "x",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "y",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "z",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CMsgVector2D",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "x",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "y",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CMsgQAngle",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "x",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "y",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "z",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CMsgRGBA",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "r",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "g",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "b",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "a",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CNETMsg_Tick",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "tick",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "host_computationtime",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "host_computationtime_std_deviation",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "host_framestarttime_std_deviation",
                    "id": 6
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CNETMsg_StringCmd",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "command",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CNETMsg_SignonState",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "signon_state",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "spawn_count",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "num_server_players",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "string",
                    "name": "players_networkids",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "map_name",
                    "id": 5
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CMsg_CVars",
            "fields": [
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "CVar",
                    "name": "cvars",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "CVar",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "name",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "value",
                            "id": 2
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                }
            ],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CNETMsg_SetConVar",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsg_CVars",
                    "name": "convars",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CNETMsg_NOP",
            "fields": [],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CNETMsg_Disconnect",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "text",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CNETMsg_File",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "transfer_id",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "file_name",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_replay_demo_file",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "deny",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_ServerInfo",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "protocol",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "server_count",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_dedicated",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_official_valve_server",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_hltv",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_replay",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_redirecting_to_proxy_relay",
                    "id": 21
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "c_os",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "fixed32",
                    "name": "map_crc",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "fixed32",
                    "name": "client_crc",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "fixed32",
                    "name": "string_table_crc",
                    "id": 10
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "max_clients",
                    "id": 11
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "max_classes",
                    "id": 12
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "player_slot",
                    "id": 13
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "tick_interval",
                    "id": 14
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "game_dir",
                    "id": 15
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "map_name",
                    "id": 16
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "map_group_name",
                    "id": 17
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "sky_name",
                    "id": 18
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "host_name",
                    "id": 19
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint64",
                    "name": "ugc_map_id",
                    "id": 22
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_ClassInfo",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "create_on_client",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "class_t",
                    "name": "classes",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "class_t",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "class_id",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "data_table_name",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "class_name",
                            "id": 3
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                }
            ],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_SendTable",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_end",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "net_table_name",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "needs_decoder",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "sendprop_t",
                    "name": "props",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "sendprop_t",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "type",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "var_name",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "flags",
                            "id": 3
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "priority",
                            "id": 4
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "dt_name",
                            "id": 5
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "num_elements",
                            "id": 6
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "float",
                            "name": "low_value",
                            "id": 7
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "float",
                            "name": "high_value",
                            "id": 8
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "num_bits",
                            "id": 9
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                }
            ],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_Print",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "text",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_SetPause",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "paused",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_SetView",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "entity_index",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_CreateStringTable",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "name",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "max_entries",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "num_entries",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "user_data_fixed_size",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "user_data_size",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "user_data_size_bits",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "flags",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bytes",
                    "name": "string_data",
                    "id": 8
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_UpdateStringTable",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "table_id",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "num_changed_entries",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bytes",
                    "name": "string_data",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_VoiceInit",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "quality",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "codec",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_VoiceData",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "client",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "proximity",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "fixed64",
                    "name": "xuid",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "audible_mask",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bytes",
                    "name": "voice_data",
                    "id": 5
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_FixAngle",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "relative",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsgQAngle",
                    "name": "angle",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_CrosshairAngle",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsgQAngle",
                    "name": "angle",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_Prefetch",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "sound_index",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_BSPDecal",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsgVector",
                    "name": "pos",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "decal_texture_index",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "entity_index",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "model_index",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "low_priority",
                    "id": 5
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_GetCvarValue",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "cookie",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "cvar_name",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_Menu",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "dialog_type",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bytes",
                    "name": "menu_key_values",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_UserMessage",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "msg_type",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bytes",
                    "name": "msg_data",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_GameEvent",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "event_name",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "eventid",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "key_t",
                    "name": "keys",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "key_t",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "type",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "val_string",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "float",
                            "name": "val_float",
                            "id": 3
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "val_long",
                            "id": 4
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "val_short",
                            "id": 5
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "val_byte",
                            "id": 6
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "bool",
                            "name": "val_bool",
                            "id": 7
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "uint64",
                            "name": "val_uint64",
                            "id": 8
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "bytes",
                            "name": "val_wstring",
                            "id": 9
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                }
            ],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_GameEventList",
            "fields": [
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "descriptor_t",
                    "name": "descriptors",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "key_t",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "type",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "name",
                            "id": 2
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                },
                {
                    "name": "descriptor_t",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "eventid",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "name",
                            "id": 2
                        },
                        {
                            "rule": "repeated",
                            "options": {},
                            "type": "key_t",
                            "name": "keys",
                            "id": 3
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                }
            ],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_TempEntities",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "reliable",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "num_entries",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bytes",
                    "name": "entity_data",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_PacketEntities",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "max_entries",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "updated_entries",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_delta",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "update_baseline",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "baseline",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "delta_from",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bytes",
                    "name": "entity_data",
                    "id": 7
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CSVCMsg_Sounds",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "reliable_sound",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "sounddata_t",
                    "name": "sounds",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "sounddata_t",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "sint32",
                            "name": "origin_x",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "sint32",
                            "name": "origin_y",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "sint32",
                            "name": "origin_z",
                            "id": 3
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "uint32",
                            "name": "volume",
                            "id": 4
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "float",
                            "name": "delay_value",
                            "id": 5
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "sequence_number",
                            "id": 6
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "entity_index",
                            "id": 7
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "channel",
                            "id": 8
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "pitch",
                            "id": 9
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "flags",
                            "id": 10
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "uint32",
                            "name": "sound_num",
                            "id": 11
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "fixed32",
                            "name": "sound_num_handle",
                            "id": 12
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "speaker_entity",
                            "id": 13
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "random_seed",
                            "id": 14
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "sound_level",
                            "id": 15
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "bool",
                            "name": "is_sentence",
                            "id": 16
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "bool",
                            "name": "is_ambient",
                            "id": 17
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                }
            ],
            "options": {},
            "oneofs": {}
        }
    ],
    "enums": [
        {
            "name": "NET_Messages",
            "values": [
                {
                    "name": "net_NOP",
                    "id": 0
                },
                {
                    "name": "net_Disconnect",
                    "id": 1
                },
                {
                    "name": "net_File",
                    "id": 2
                },
                {
                    "name": "net_Tick",
                    "id": 4
                },
                {
                    "name": "net_StringCmd",
                    "id": 5
                },
                {
                    "name": "net_SetConVar",
                    "id": 6
                },
                {
                    "name": "net_SignonState",
                    "id": 7
                }
            ],
            "options": {}
        },
        {
            "name": "SVC_Messages",
            "values": [
                {
                    "name": "svc_ServerInfo",
                    "id": 8
                },
                {
                    "name": "svc_SendTable",
                    "id": 9
                },
                {
                    "name": "svc_ClassInfo",
                    "id": 10
                },
                {
                    "name": "svc_SetPause",
                    "id": 11
                },
                {
                    "name": "svc_CreateStringTable",
                    "id": 12
                },
                {
                    "name": "svc_UpdateStringTable",
                    "id": 13
                },
                {
                    "name": "svc_VoiceInit",
                    "id": 14
                },
                {
                    "name": "svc_VoiceData",
                    "id": 15
                },
                {
                    "name": "svc_Print",
                    "id": 16
                },
                {
                    "name": "svc_Sounds",
                    "id": 17
                },
                {
                    "name": "svc_SetView",
                    "id": 18
                },
                {
                    "name": "svc_FixAngle",
                    "id": 19
                },
                {
                    "name": "svc_CrosshairAngle",
                    "id": 20
                },
                {
                    "name": "svc_BSPDecal",
                    "id": 21
                },
                {
                    "name": "svc_UserMessage",
                    "id": 23
                },
                {
                    "name": "svc_GameEvent",
                    "id": 25
                },
                {
                    "name": "svc_PacketEntities",
                    "id": 26
                },
                {
                    "name": "svc_TempEntities",
                    "id": 27
                },
                {
                    "name": "svc_Prefetch",
                    "id": 28
                },
                {
                    "name": "svc_Menu",
                    "id": 29
                },
                {
                    "name": "svc_GameEventList",
                    "id": 30
                },
                {
                    "name": "svc_GetCvarValue",
                    "id": 31
                }
            ],
            "options": {}
        }
    ],
    "imports": [],
    "options": {
        "cc_generic_services": false
    },
    "services": []
}
