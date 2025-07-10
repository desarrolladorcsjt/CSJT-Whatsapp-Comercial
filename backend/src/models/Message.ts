import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  DataType,
  PrimaryKey,
  Default,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript";
import Contact from "./Contact";
import Ticket from "./Ticket";

@Table
class Message extends Model<Message> {
  @PrimaryKey
  @Column
  id: string;

  @Default(0)
  @Column
  ack: number;

  @Default(false)
  @Column
  read: boolean;

  @Default(false)
  @Column
  fromMe: boolean;

  @Column(DataType.TEXT)
  body: string;

@Column(DataType.STRING)
get mediaUrl(): string | null {
  const raw = this.getDataValue("mediaUrl");
  if (!raw) return null;

  // Asegurarnos de que BACKEND_URL empiece con http:// o https://
  let base = process.env.BACKEND_URL ?? "";
  if (!base.startsWith("http://") && !base.startsWith("https://")) {
    base = `http://${base}`;
  }

  const port = process.env.PROXY_PORT;
  // Construimos la URL completa
  return `${base}:${port}/public/${raw}`;
}


  // @Column(DataType.STRING)
  // get mediaUrl(): string | null {
  //   if (this.getDataValue("mediaUrl")) {
  //     return `http://192.168.1.55:30080/public/${this.getDataValue("mediaUrl")}`;
  //   }
  //   return null;
  // }

  @Column
  mediaType: string;

  @Default(false)
  @Column
  isDeleted: boolean;

  @CreatedAt
  @Column(DataType.DATE(6))
  createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE(6))
  updatedAt: Date;

  @ForeignKey(() => Message)
  @Column
  quotedMsgId: string;

  @BelongsTo(() => Message, "quotedMsgId")
  quotedMsg: Message;

  @ForeignKey(() => Ticket)
  @Column
  ticketId: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @ForeignKey(() => Contact)
  @Column
  contactId: number;

  @BelongsTo(() => Contact, "contactId")
  contact: Contact;
}

export default Message;
