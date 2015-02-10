{
    "package": null,
    "messages": [
        {
            "name": "CCSUsrMsg_VGUIMenu",
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
                    "type": "bool",
                    "name": "show",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "Subkey",
                    "name": "subkeys",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "Subkey",
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
                            "name": "str",
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
            "name": "CCSUsrMsg_Geiger",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "range",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_Train",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "train",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_HudText",
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
            "name": "CCSUsrMsg_SayText",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "ent_idx",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "text",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "chat",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "textallchat",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_SayText2",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "ent_idx",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "chat",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "msg_name",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "string",
                    "name": "params",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "textallchat",
                    "id": 5
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_TextMsg",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "msg_dst",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "string",
                    "name": "params",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_HudMsg",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "channel",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsgVector2D",
                    "name": "pos",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsgRGBA",
                    "name": "clr1",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsgRGBA",
                    "name": "clr2",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "effect",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "fade_in_time",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "fade_out_time",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "hold_time",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "fx_time",
                    "id": 10
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "text",
                    "id": 11
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_Shake",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "command",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "local_amplitude",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "frequency",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "duration",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_Fade",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "duration",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "hold_time",
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
                    "type": "CMsgRGBA",
                    "name": "clr",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_Rumble",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "index",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "data",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "flags",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_CloseCaption",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "hash",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "duration",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "from_player",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_CloseCaptionDirect",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "uint32",
                    "name": "hash",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "duration",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "from_player",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_SendAudio",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "radio_sound",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_RawAudio",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "pitch",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "entidx",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "duration",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "voice_filename",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_VoiceMask",
            "fields": [
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "PlayerMask",
                    "name": "player_masks",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "player_mod_enable",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "PlayerMask",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "game_rules_mask",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "ban_masks",
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
            "name": "CCSUsrMsg_Damage",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "amount",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "CMsgVector",
                    "name": "inflictor_world_pos",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_RadioText",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "msg_dst",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "client",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "msg_name",
                    "id": 3
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "string",
                    "name": "params",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_HintText",
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
            "name": "CCSUsrMsg_KeyHintText",
            "fields": [
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "string",
                    "name": "hints",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_ProcessSpottedEntityUpdate",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "new_update",
                    "id": 1
                },
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "SpottedEntityUpdate",
                    "name": "entity_updates",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "SpottedEntityUpdate",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "entity_idx",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "class_id",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "origin_x",
                            "id": 3
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "origin_y",
                            "id": 4
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "origin_z",
                            "id": 5
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "int32",
                            "name": "angle_y",
                            "id": 6
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "bool",
                            "name": "defuser",
                            "id": 7
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "bool",
                            "name": "player_has_defuser",
                            "id": 8
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "bool",
                            "name": "player_has_c4",
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
            "name": "CCSUsrMsg_ReloadEffect",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "entidx",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "actanim",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_AdjustMoney",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "amount",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_KillCam",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "obs_mode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "first_target",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "second_target",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_DesiredTimescale",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "desired_timescale",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "duration_realtime_sec",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "interpolator_type",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "start_blend_time",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_CurrentTimescale",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "float",
                    "name": "cur_timescale",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_AchievementEvent",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "achievement",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "count",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "user_id",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_MatchEndConditions",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "fraglimit",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "mp_maxrounds",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "mp_winlimit",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "mp_timelimit",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_DisplayInventory",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "display",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "user_id",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_CallVoteFailed",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "reason",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "time",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_VoteStart",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "team",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "ent_idx",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "vote_type",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "disp_str",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "details_str",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "other_team_str",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "is_yes_no_vote",
                    "id": 7
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_VotePass",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "team",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "vote_type",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "disp_str",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "details_str",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_VoteFailed",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "team",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "reason",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_VoteSetup",
            "fields": [
                {
                    "rule": "repeated",
                    "options": {},
                    "type": "string",
                    "name": "potential_issues",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_SendLastKillerDamageToClient",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "num_hits_given",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "damage_given",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "num_hits_taken",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "damage_taken",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_ItemPickup",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "item",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_ShowMenu",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "bits_valid_slots",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "display_time",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "menu_string",
                    "id": 3
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_BarTime",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "time",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_AmmoDenied",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "ammoIdx",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_MarkAchievement",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "achievement",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_ItemDrop",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int64",
                    "name": "itemid",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "death",
                    "id": 2
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_GlowPropTurnOff",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "entidx",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_RoundBackupFilenames",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "count",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "index",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "filename",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "nicename",
                    "id": 4
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_ResetHud",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "bool",
                    "name": "reset",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_GameTitle",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "dummy",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_RequestState",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "dummy",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_StopSpectatorMode",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "dummy",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_DisconnectToLobby",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "dummy",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_WarmupHasEnded",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "dummy",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        },
        {
            "name": "CCSUsrMsg_ClientInfo",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "int32",
                    "name": "dummy",
                    "id": 1
                }
            ],
            "enums": [],
            "messages": [],
            "options": {},
            "oneofs": {}
        }
    ],
    "enums": [
        {
            "name": "ECstrike15UserMessages",
            "values": [
                {
                    "name": "CS_UM_VGUIMenu",
                    "id": 1
                },
                {
                    "name": "CS_UM_Geiger",
                    "id": 2
                },
                {
                    "name": "CS_UM_Train",
                    "id": 3
                },
                {
                    "name": "CS_UM_HudText",
                    "id": 4
                },
                {
                    "name": "CS_UM_SayText",
                    "id": 5
                },
                {
                    "name": "CS_UM_SayText2",
                    "id": 6
                },
                {
                    "name": "CS_UM_TextMsg",
                    "id": 7
                },
                {
                    "name": "CS_UM_HudMsg",
                    "id": 8
                },
                {
                    "name": "CS_UM_ResetHud",
                    "id": 9
                },
                {
                    "name": "CS_UM_GameTitle",
                    "id": 10
                },
                {
                    "name": "CS_UM_Shake",
                    "id": 12
                },
                {
                    "name": "CS_UM_Fade",
                    "id": 13
                },
                {
                    "name": "CS_UM_Rumble",
                    "id": 14
                },
                {
                    "name": "CS_UM_CloseCaption",
                    "id": 15
                },
                {
                    "name": "CS_UM_CloseCaptionDirect",
                    "id": 16
                },
                {
                    "name": "CS_UM_SendAudio",
                    "id": 17
                },
                {
                    "name": "CS_UM_RawAudio",
                    "id": 18
                },
                {
                    "name": "CS_UM_VoiceMask",
                    "id": 19
                },
                {
                    "name": "CS_UM_RequestState",
                    "id": 20
                },
                {
                    "name": "CS_UM_Damage",
                    "id": 21
                },
                {
                    "name": "CS_UM_RadioText",
                    "id": 22
                },
                {
                    "name": "CS_UM_HintText",
                    "id": 23
                },
                {
                    "name": "CS_UM_KeyHintText",
                    "id": 24
                },
                {
                    "name": "CS_UM_ProcessSpottedEntityUpdate",
                    "id": 25
                },
                {
                    "name": "CS_UM_ReloadEffect",
                    "id": 26
                },
                {
                    "name": "CS_UM_AdjustMoney",
                    "id": 27
                },
                {
                    "name": "CS_UM_UpdateTeamMoney",
                    "id": 28
                },
                {
                    "name": "CS_UM_StopSpectatorMode",
                    "id": 29
                },
                {
                    "name": "CS_UM_KillCam",
                    "id": 30
                },
                {
                    "name": "CS_UM_DesiredTimescale",
                    "id": 31
                },
                {
                    "name": "CS_UM_CurrentTimescale",
                    "id": 32
                },
                {
                    "name": "CS_UM_AchievementEvent",
                    "id": 33
                },
                {
                    "name": "CS_UM_MatchEndConditions",
                    "id": 34
                },
                {
                    "name": "CS_UM_DisconnectToLobby",
                    "id": 35
                },
                {
                    "name": "CS_UM_DisplayInventory",
                    "id": 37
                },
                {
                    "name": "CS_UM_WarmupHasEnded",
                    "id": 38
                },
                {
                    "name": "CS_UM_ClientInfo",
                    "id": 39
                },
                {
                    "name": "CS_UM_CallVoteFailed",
                    "id": 45
                },
                {
                    "name": "CS_UM_VoteStart",
                    "id": 46
                },
                {
                    "name": "CS_UM_VotePass",
                    "id": 47
                },
                {
                    "name": "CS_UM_VoteFailed",
                    "id": 48
                },
                {
                    "name": "CS_UM_VoteSetup",
                    "id": 49
                },
                {
                    "name": "CS_UM_SendLastKillerDamageToClient",
                    "id": 51
                },
                {
                    "name": "CS_UM_ItemPickup",
                    "id": 53
                },
                {
                    "name": "CS_UM_ShowMenu",
                    "id": 54
                },
                {
                    "name": "CS_UM_BarTime",
                    "id": 55
                },
                {
                    "name": "CS_UM_AmmoDenied",
                    "id": 56
                },
                {
                    "name": "CS_UM_MarkAchievement",
                    "id": 57
                },
                {
                    "name": "CS_UM_ItemDrop",
                    "id": 59
                },
                {
                    "name": "CS_UM_GlowPropTurnOff",
                    "id": 60
                }
            ],
            "options": {}
        }
    ],
    "imports": [
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
    ],
    "options": {
        "optimize_for": "SPEED",
        "cc_generic_services": false
    },
    "services": []
}